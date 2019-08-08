---
path: "/hello2"
date: 2017-07-12T17:12:33.962Z
title: "My Second Gatsby Post"
tags:
  - tech stack
  - colophon
  - about
featured: ui-and-code.png
summary: 'my first article!'
type: "note"
---

# Oooooh-weeee!
## Test2
### Test2

djfdskfjsd sldkfjjdslkfjdslkfj

- asd
- sadsa
- sadasdsad

Sass расширяет CSS правило1 ```@import```, позволяя импортировать scss и sass файлы. Все импортированные scss и sass файлы могут быть объединены в одном результирующем css файле. Кроме того, любые переменные или миксины, объявленные в импортированном файле, могут использоваться в главном файле.

Компилятор ищет другие файлы sass в текущей папке, и в каталоге файлов sass при использовании в Rack, Rails или Merb. Дополнительные каталоги поиска могут задаваться с помощью опции ```:load_paths``` или ключ ```--load-path``` в командной строке.

my first blog post!
```javascript
let a = 5;
a = 6;

import mongoose from 'mongoose';
import Material from '../../../../models/material.model';
import {buildMediaListQuery, getMediaByQuery} from '../../media/services/mediaService';
import {getChildCategories} from './material-category.service';
import * as OrganizationService from '../../organization/services/orgService';
import {getNext} from '../../../../models/Counter';
import {BadRequestError, NotPermittedError} from '../../../errors';
import esb from 'elastic-builder';
import * as pg from '../../../postgresql';
import * as elastic from '../../../elastic';
import {onUpdateModel} from '../../../dw/services/copyELASTIC';
import {getOptionsCount} from './material-option.service';
import {equalsObjectId} from "../../../util/objectId";
import {userNotCuratedOrganizations} from "../../organization/services/orgService";

export function materialContextExecute(materialId, user, force) {
  const q = {_id: materialId};
  if (force || user.privilege === 'sysAdmin') {
    return Material.findOne(q).populate('image manufacturer').exec().then(material => {
      return populateGallery(material, user);
    });
  }
  return OrganizationService.userOrganizations(user).then((orgIds) => {
    q.deleted = {$ne: true};
    q.$or = [
      {permission: 'public'},
      {permission: {$exists: false}},
      {owner: user._id},
      {$and: [{permission: 'organization'}, {organization: {$in: orgIds}}]}
    ];
    return Material.findOne(q).populate('image gallery manufacturer').exec().then(material => {
      if (material) {
        material = material.toObject();
        return populateGallery(material, user).then(material => {
          return populateMaterialNumber(material, user);
        });
      }
    });
  });
}

export function getMaterialType(materialId) {
  return Material.findById(materialId).exec().then(material => {
    return material && material.type;
  });
}

export function getPermittedMaterial(materialId, user) {
  const q = {_id: materialId};
  if (user.privilege === 'sysAdmin') {
    return Material.findOne(q).populate('image manufacturer').exec();
  }
  return OrganizationService.userAdminOrganizations(user).then((orgIds) => {
    q.deleted = {$ne: true};
    q.$or = [
      {$and: [{permission: 'organization'}, {owner: user._id}]},
      {$and: [{permission: 'private'}, {owner: user._id}]},
      {$and: [{permission: 'organization'}, {organization: {$in: orgIds}}]}
    ];
    return Material.findOne(q).populate('image manufacturer').exec();
  });
}

export function listMaterials(user, query, orgIds) {
  const q = {};
  if (query.categories) {
    const categories = (Array.isArray(query.categories) ? query.categories : [query.categories])
      .map(category => mongoose.Types.ObjectId(category));
    return getChildCategories(categories, []).then((categories) => {
      q.categories = {$in: categories};
      return searchMaterials(categories, user, query, orgIds);
    });
  }
  return searchMaterials(null, user, query, orgIds);
}

export function createMaterial(material, user) {
  if (/^EX/.test(material.sku)) {
    throw new BadRequestError('Material Numbers starting with "EX" are reserved by the system');
  }
  return getNext('Material').then((counter) => {
    material.counter = counter;
    material.owner = user._id;
    material.permission = material.permission || 'private';
    material.sku = material.sku || 'EX' + ('00000' + material.counter).substr(-6);
    return Material.create(material).then(doc => {
      return onMaterialUpdated(doc).then(() => doc);
    });
  });
}

function checkCounterField(material) {
  if (!material.counter) {
    return getNext('Material');
  }
  return new Promise((resolve) => {
    return resolve(material.counter);
  });
}

export function updateMaterial(id, user, materialRequest) {
  return getPermittedMaterial(id, user).then((material) => {
    if (!material || (user.privilege !== 'sysAdmin' && materialRequest.permission === 'public')
      || ((!material.owner || !material.owner.equals(user._id)) && user.privilege !== 'sysAdmin'
        && (materialRequest.permission === 'private' || materialRequest.deleted))) {
      throw new NotPermittedError();
    }
    delete materialRequest.__v;
    if (materialRequest.counter) {
      delete materialRequest.counter;
    }
    const _sku = /^EX(.*)/.exec(materialRequest.sku);
    return checkCounterField(material).then((counter) => {
      material.counter = counter;
      if (/^EX/.test(materialRequest.sku) && _sku && +_sku[1] !== material.counter && material.sku !== materialRequest.sku) {
        throw new BadRequestError('Material Numbers starting with "EX" are reserved by the system');
      }
      materialRequest.sku = materialRequest.sku || 'EX' + ('00000' + material.counter).substr(-6);
      Object.assign(material, materialRequest, {_id: id, lastUpdate: Date.now()});
      material.owner = material.owner || user._id;
      return material.save().then(doc => {
        return onMaterialUpdated(doc).then(() => doc);
      });
    });
  });
}

export function removeMaterial(id, user) {
  return getPermittedMaterial(id, user).then((result) => {
    if (!result || ((!result.owner || !result.owner.equals(user._id)) && user.privilege !== 'sysAdmin')) {
      throw new NotPermittedError();
    }
    result.deleted = true;
    result.owner = result.owner || user._id;
    return result.save().then(doc => {
      return onMaterialUpdated(doc).then(() => doc);
    });
  });
}

export function populateMaterialNumber(material, user, organizationId) {
  if (material) {
    if (organizationId && material.references && material.references.length) {
      const reference = material.references
        .find(reference => (equalsObjectId(reference.organization, organizationId)));
      if (reference) {
        material.number = reference.sku;
        material.references = [];
        return Promise.resolve(material);
      }
    }
    if (user) {
      return userNotCuratedOrganizations(user._id).then(orgIds => {
        if (orgIds && orgIds.length === 1 && material.references && material.references.length) {
          const organizationId = orgIds[0];
          const reference = material.references
            .find(reference => (equalsObjectId(reference.organization, organizationId)));
          if (reference) {
            material.number = reference.sku;
            material.references = [];
            return material;
          }
        }
        if (user.privilege !== 'sysAdmin' && (!orgIds || orgIds.length === 0)) {
          material.references = [];
        }
        if (orgIds && orgIds.length && user.privilege !== 'sysAdmin' && material.references && material.references.length) {
          material.references = material.references.filter(reference => {
            return !!orgIds.find(orgId => (equalsObjectId(reference.organization, orgId)));
          });
        }
        material.number = material.sku;
        return material;
      });
    }
    material.number = material.sku;
    material.references = [];
  }
  return Promise.resolve(material);
}

function searchMaterials(categories, user, query, orgIds) {
  let q = esb.boolQuery();

  if (query._searchText && query._searchFields) {
    query._searchText = query._searchText.replace(/([\+\-\&\|\!\(\)\{\}\[\]\^\"\~\*\?\:\\\^\/])/img, "\\$1");
    let fields = query._searchFields.split(',');
    fields = fields.map((field, i) => {
      return field + '^' + (fields.length - i) + '00';
    });

    if (user.privilege !== 'sysAdmin' && orgIds.length === 1 && query._searchFields.indexOf('sku') > -1) {
      fields.push(orgIds[0] + '^' + query._searchFields.length + 1);
    }
    let search = esb.boolQuery();
    q.must(search);
    search.should(esb.queryStringQuery('*' + query._searchText + '*').boost(0.01));
    search.should(esb.multiMatchQuery(fields, query._searchText).fuzziness('AUTO').operator('and'));
    search.minimumShouldMatch(1);
  }
  if (query.organizations) {
    q.filter(esb.termsQuery('permission', 'organization'));
    q.filter(esb.termsQuery('organization', query.organizations));
  }
  if (query.manufactures) {
    q.filter(esb.termsQuery('manufacturer', query.manufactures));
  }
  if (categories) {
    q.filter(esb.termsQuery('categories', categories));
  }
  if (user.privilege !== 'sysAdmin' || !query['show_deleted']) {
    q.filter(esb.boolQuery().mustNot(esb.matchQuery('deleted', 'true')));
  }
  if (query.type) {
    const types = query.type.split(',');
    q.filter(esb.termsQuery('type', types));
  }
  if (user.privilege !== 'sysAdmin') {
    return OrganizationService.userOrganizations(user).then((orgIds) => {
      let perm = esb.boolQuery();
      q.filter(perm);
      perm.should(esb.matchQuery('permission', 'public'));
      perm.should(esb.cookMissingQuery('permission'));
      perm.should(esb.boolQuery()
        .must(esb.matchQuery('permission', 'public'))
        .must(esb.matchQuery('owner', pg.objectId(user._id)))
      );
      if (query.organizationId && query.organizationId !== 'all' && orgIds.find(org => org.equals(query.organizationId))) {
        perm.should(esb.boolQuery()
          .must(esb.matchQuery('permission', 'organization'))
          .must(esb.matchQuery('organization', query.organizationId))
        );
      } else {
        perm.should(esb.boolQuery()
          .must(esb.matchQuery('permission', 'organization'))
          .must(esb.termsQuery('organization', orgIds))
        );
        perm.should(esb.matchQuery('owner', pg.objectId(user._id)));
      }
      return materialsByQueryFromElasticSearch(q, query, user);
    });
  } else if (query.organizationId && query.organizationId !== 'all') {
    q.filter(esb.boolQuery()
      .should(esb.matchQuery('organization', query.organizationId))
      .should(esb.boolQuery().mustNot(esb.termQuery('permission', 'organization')))
    );
  }
  return materialsByQueryFromElasticSearch(q, query, user);
}

/**
 * Lookup materials from elastic search
 *
 * @param {esb.Query} q elasticsearch builder query
 * @param params users request
 * @param user
 * @param orgIds
 */
function materialsByQueryFromElasticSearch(q, params, user) {
  let body = esb.requestBodySearch()
    .query(q)
    .from((parseInt(params._offset, 10) || 0))
    .size((parseInt(params._size, 10) || 10));
  if(!params._searchText) {
    body = body.sort(esb.sort('name.raw'))
  }

  return elastic.search('materials', body.toJSON()).then(resp => elastic.resp2resp(resp)).then(result => {
    return Promise.all(result.items.map(material => {

      const m = new Material(material);
      return m.deepPopulate('organization image manufacturer references.organization gallery').then(material => {
        material = material.toObject();
        if (material.type === 'tray') {
          return getOptionsCount(material._id).then(count => {
            material.optionsCount = count;
            return populateGallery(material, user).then(material => {
              return populateMaterialNumber(material, user);
            });
          });
        }
        return populateGallery(material, user).then(material => {
          return populateMaterialNumber(material, user);
        })
      });
    })).then(items => {
      result.items = items;
      return result;
    })
  });
}

/**
 * getMaterials for elastic search;
 * @param {string} query
 * @param {number} skip
 * @param {number} limit
 * @returns {Promise<Array>}
 */
export function materialQuery(query, skip, limit) {
  let q = Material.find(query).select('type sku categories optionsCount name image permission size owner ' +
    'organization manufacturer description sterility reusable deleted gallery references');
  if (skip) {
    q = q.skip(skip)
  }
  if (limit) {
    q = q.limit(limit)
  }
  return q.exec().then(materials => {
    return materials.map(material => {
      material = material.toObject();
      material.references.forEach(reference => {
        material[reference.organization.toString()] = reference.sku;
      });
      return material;
    })
  });
}

function onMaterialUpdated(obj) {
  let id = obj && (obj.id ? obj.id : (obj._id ? obj._id : obj));
  return materialQuery({_id: id}).then(mat => mat && mat.length > 0 && onUpdateModel('materials', mat[0]))
}

export function populateGallery(material, user, organizationId) {
  if (material) {
    material = material.toObject ? material.toObject() : material;
    const mediaIds = material.gallery;
    if (mediaIds && mediaIds.length > 0) {
      return buildMediaListQuery(user, null, organizationId).then(queryArray => {
        queryArray.push({_id: {$in: mediaIds}});
        const query = {$and: queryArray};
        return getMediaByQuery(query).then(media => {
          material.gallery = media.map(item => item.toObject ? item.toObject() : item);
          return material;
        });
      });
    }
  }
  return Promise.resolve(material);
}


```
```html
<div>123</div>
```
import locales from '../locales/';

export function translate(lang='en', key) {
  if(!key) {
    return '';
  }
  const translation = locales[lang];
  const path = key.split('.');
  return [translation].concat(path).reduce((obj, key) => {
    return obj[key];
  })
}

export function getLocalizedUrl(url, lang) {
  if (lang === 'en') {
    return url;
  }
  return `/${lang}${url}`
}


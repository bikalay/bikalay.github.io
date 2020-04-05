import React from "react";
import { T } from "../../components/common/translate"
import Layout from "../../components/layout"
import { Header } from "../../components/header"
import { graphql, Link } from "gatsby"
import { getLocalizedUrl } from "../../utils/i18n"

export default ({data}) => {
  const tags =  data.allMarkdownRemark.group;
  return (
    <Layout>
      <Header lang="ru" className="bg-primary"/>
      <section className="container">
        <h1><T lang="ru" tk="tags.tags">Tags</T></h1>
        <br/>
        <ul className="list-unstyled">
          {tags.map(item => {
            return (
              <li className="my-3">
                <Link className="btn btn-info btn-lg" to={getLocalizedUrl(`/blog/tags/${item.tag}`, 'ru')}>
                  {item.tag} <span className="badge badge-light">{item.totalCount}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </Layout>
  )
}

export const query = graphql`
    query tagsQueryiRU {
        allMarkdownRemark(filter: {frontmatter: {lang: {eq: "ru"}}}) {
            group(field: frontmatter___tags) {
                tag: fieldValue
                totalCount
            }
        }
    }
`;

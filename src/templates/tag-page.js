import React from "react"

import { Link } from "gatsby"
import { Articles } from "../components/articles-list-block"
import { T } from "../components/common/translate"
import Layout from "../components/layout"
import { Header } from "../components/header"
import { getLocalizedUrl } from "../utils/i18n"

const Tags = ({ pageContext }) => {
  const { tag, totalCount, lang } = pageContext
  return (
    <Layout>
      <Header lang={lang} className="bg-primary" />
    <section className="container">
      <h1>{totalCount} <T tk={totalCount === 1 ? 'tags.one_post' :  (totalCount > 4 ? 'tags.many_posts' : 'tags.few_posts')} lang={lang}>posts tagged with</T> "{tag}"</h1>
      <br/>
      <Articles tag={tag} lang={lang}/>
      <Link to={getLocalizedUrl('/blog/tags', lang)}>
        <T tk={"tags.all_tags"} lang={lang}>All tags</T>
      </Link>
    </section>
    </Layout>
  )
}
export default Tags


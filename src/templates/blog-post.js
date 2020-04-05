import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Header } from "../components/header"

export default ({ data }) => {
  const { frontmatter, html } = data.markdownRemark
  return (
    <Layout>
      <Header className="bg-primary"/>
      <section className="container">
        <div className="row">
          <div className="col-12 col-lg-8 bg-white">
            <article className="bg-white p-5">
              <small>{frontmatter.date}</small>
              <div dangerouslySetInnerHTML={{ __html: html }}/>
            </article>
          </div>
          <div className="col-12 col-lg-4">
            <h2>Simular Articles</h2>
          </div>
        </div>
      </section>

    </Layout>
  )
}

export const query = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                path
                title
            }
        }
    }
`

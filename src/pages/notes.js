import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import { PostCard } from "../components/post-card/post-card.component"
import SEO from "../components/common/seo"

export default function Notes({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout>
      <SEO title="Шпаргалки"/>
      <div className="blog-posts">
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => {
            return (
              <PostCard key={post.id} post={post} />
            )
          })}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
    query NotesQuery {
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: {frontmatter: { type: { eq: "note" } } }
        ) {
            edges {
                node {
                    excerpt(pruneLength: 250)
                    id
                    frontmatter {
                        title
                        date(formatString: "MMMM DD, YYYY")
                        path
                        summary
                        tags
                        type
                    }
                }
            }
        }
    }
`
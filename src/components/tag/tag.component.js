import React from "react"
import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"
import { PostCard } from "../post-card/post-card.component"
import Layout from "../layout/layout"

export default function Tag ({ pageContext, data })  {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { title, path } = node.frontmatter
          return (
            <li key={node.id}>
              <PostCard post={node} />
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export const pageQuery = graphql`
    query($tag: String) {
        allMarkdownRemark(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
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
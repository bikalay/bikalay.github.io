import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import Img from "gatsby-image"
import { getLocalizedUrl } from "../utils/i18n"

const query = graphql`
    query articlesPerview {
        allMarkdownRemark {
            edges {
                node {
                    frontmatter {
                        category
                        date(formatString: "MMMM DD, YYYY")
                        description
                        lang
                        path
                        tags
                        title
                        featuredImage {
                            childImageSharp {
                                fluid(maxWidth: 800) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export const Articles = ({ category, tag, limit = 1000, lang }) => {
  return (
    <StaticQuery query={query} render={(data) => {
      const posts = data.allMarkdownRemark.edges.filter(item => {
        const { node } = item
        return (!category || category === node.frontmatter.category)
          && (!tag || node.frontmatter.tags.indexOf(tag) > -1)
          &&  (!lang || lang === node.frontmatter.lang)
      }).slice(0, limit);
      return (
        <ul className="list-unstyled row articles-previews">
          {posts.map(item => {
            const post = item.node
            return (
              <li className="col-sm-6 col-md-4 col-12">
                <div className="card shadow-sm">
                  <Img fluid={post.frontmatter.featuredImage.childImageSharp.fluid} className="card-img-top"/>
                  <div className="card-body">
                    <div className="article-category badge badge-danger">{post.frontmatter.category}</div>
                      <Link to={post.frontmatter.path}><h3>{post.frontmatter.title}</h3></Link>
                    <p>{post.frontmatter.description}</p>
                    <small>{post.frontmatter.date}</small>
                    <ul className="list-unstyled">
                      {post.frontmatter.tags.map(tag => {
                        return (
                          <li className="d-inline-block mr-1">
                            <Link to={getLocalizedUrl(`/blog/tags/${tag}`, lang)} className="badge badge-info">{tag}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )
    }}
    />
  )
}

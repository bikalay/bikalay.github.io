import React from 'react'
import { graphql, useStaticQuery } from "gatsby"

export function TagsWidget({}) {
  const data = useStaticQuery(graphql`
      query TagsQuery {
          allMarkdownRemark {
              distinct(field: frontmatter___tags)
          }
      }
  `)
  const tags = data.allMarkdownRemark.distinct;
  return (
    <div className="card p-3">
      <h4>Темы</h4>
      <ul>
        {tags.map(tag => <li><a>{tag}</a></li>)}
      </ul>
    </div>
  )
}

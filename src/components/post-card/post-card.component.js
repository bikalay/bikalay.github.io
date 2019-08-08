import React from "react"
import { Link } from "gatsby"

export function PostCard({ post, size }) {
  const { path, title, date, summary, tags } = post.frontmatter
  return (
    <article className="card my-3 p-3" key={post.id}>
      <h2 className="h4">
        <Link to={path}>{title}</Link>
      </h2>
      <span>{date}</span>
      <p>{summary}</p>
      <ul>
        {tags && tags.map(tag => <li key={tag}><Link to={'/tags/'+tag}>#{tag}</Link></li>)}
      </ul>
    </article>
  )
}
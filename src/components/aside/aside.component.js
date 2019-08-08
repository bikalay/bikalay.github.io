import React from "react"
import { AuthorWidget } from "../author-widget/author-widget.component"
import { TagsWidget } from "../tags-widget/tags-widget.component"

export function Aside({}) {
  return (<aside className="mt-3 row">
    <div className="col-lg-12 col-md-4 col-sm-6 col-12">
      <AuthorWidget/>
    </div>
    <div className="col-lg-12 col-md-4 col-sm-6 col-12">
      <TagsWidget/>
    </div>
  </aside>)
}
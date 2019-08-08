import React from "react"
import { Image } from "../common/image"
import './author-wdget.component.scss'

export function AuthorWidget({}) {
  return (
    <div className="card h-card">
      <Image className="card-img-top photo" src="avatar.png" alt="Alexandr Vovchuk"/>
      <div className="card-body">
        <h5 className="card-title p-name">Alexandr Vovchuk</h5>
        <p className="card-text">
          <h6 className="p-job-title">Software Engineer</h6>
          <div>
            Email: <a className="u-email" href="mailto:a.vovchuk@gmail.com">a.vovchuk@gmail.com</a>
          </div>
          <div>
            GitHub: <a className="u-github" href="https://github.com/bikalay">bikalay</a>
          </div>
        </p>
      </div>
    </div>
  )
}
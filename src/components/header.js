import React from "react"
import { Link } from "gatsby"
import { T } from "./common/translate"
import { getLocalizedUrl } from "../utils/i18n"

export const Header = ({ lang = "en", className}) => (
  <header className={className}>
    <nav className="container navbar navbar-expand-lg navbar-dark bg-transparent">
      <Link className="navbar-brand" to="/">
        <div className="navbar-logo">&nbsp;</div>
        <b>Bikalay</b></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon">
        </span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item d-flex">
            <Link className="nav-link" activeClassName="active" to="/">EN</Link> <span className="py-2">/</span> <Link activeClassName="active" className="nav-link" to="/ru">RU</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"><T tk={"header.download_cv"} lang={lang}>Download CV</T></a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" activeClassName="active" to={getLocalizedUrl("/blog", lang)}>
              <T tk={"header.blog"} lang={lang}>Blog</T>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
)






import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

export const Navbar = ({ siteTitle }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand text-primary" to="/">{siteTitle}</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" activeClassName="active" to="/posts">Статьи</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" activeClassName="active" to="/notes">Шпаргалки</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" activeClassName="active" to="/about">О Блоге</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)
Navbar.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

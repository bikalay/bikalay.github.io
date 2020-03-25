import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

const Header = () => (
  <header>
    <nav className="container navbar navbar-expand-lg navbar-dark bg-transparent">
      <Link className="navbar-brand" to="/"><b>Bikalay</b></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon">
        </span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">CV</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Blog</a>0
          </li>
        </ul>
      </div>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

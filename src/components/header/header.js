import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Navbar } from "../navbar/navbar.component"

export const Header = ({ siteTitle }) => (
  <header>
    <Navbar siteTitle={siteTitle}/>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

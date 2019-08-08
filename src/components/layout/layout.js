/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import { Header } from "../header/header"
import "./layout.scss"
import { Aside } from "../aside/aside.component"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
      query SiteTitleQuery {
          site {
              siteMetadata {
                  title
              }
          }
      }
  `)

  return (
    <>
      <div className="no-footer">
        <Header siteTitle={data.site.siteMetadata.title}/>
        <div className="container">
          <div className="row">
            <main className="col-lg-9">
              {children}
            </main>
            <div className="col-lg-3">
              <Aside/>
            </div>
          </div>
        </div>
      </div>
      <footer className="py-2">
        <div className="container">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
        </div>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

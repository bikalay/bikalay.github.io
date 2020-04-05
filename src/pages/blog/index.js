import React from "react"
import Layout from "../../components/layout"
import { Header } from "../../components/header"
import { Articles } from "../../components/articles-list-block"

export default ({data}) => {
  return (
    <Layout>
      <Header lang="en" className="bg-primary navbar-dark" />
      <section className="container">
        <h1>
          Blog
        </h1>
        <Articles lang="en" />
      </section>
    </Layout>
  )
}

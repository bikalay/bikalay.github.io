import Layout from "../../components/layout"
import { Header } from "../../components/header"
import { Articles } from "../../components/articles-list-block"
import React from "react"

export default ({data}) => {
  return (
    <Layout>
      <Header lang="ru" className="bg-primary navbar-dark"/>
      <section className="container">
        <h1>
          Блог
        </h1>
        <Articles lang="ru"/>
      </section>
    </Layout>
  )
}

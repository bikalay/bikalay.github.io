/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve("src/templates/blog-post.js")
  const blogPosts = await graphql(`
  {
    allMarkdownRemark( 
      sort: {order: DESC, fields: [frontmatter___date]}
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            path
          }
        }
      }
    }
  }
  `)
  if (blogPosts.errors) {
    return reporter.panicOnBuild("Error while running GraphQL query")
  }
  blogPosts.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {}, // additional data can be passed via context
    })
  })

  const tagPage = path.resolve("src/templates/tag-page.js")
  const tagsEn = await graphql(` 
  {
      allMarkdownRemark(filter: {frontmatter: {lang: {eq: "en"}}}) {
        group(field: frontmatter___tags) {
          tag: fieldValue
          totalCount
        }
      }
  }   
  `)
  if (tagsEn.errors) {
    return reporter.panicOnBuild("Error while running GraphQL query")
  }
  tagsEn.data.allMarkdownRemark.group.forEach(group => {
    createPage({
      path: `/blog/tags/${group.tag}`,
      component: tagPage,
      context: {...group, lang: 'en'}
    })
  })
  const tagsRu = await graphql(` 
  {
      allMarkdownRemark(filter: {frontmatter: {lang: {eq: "ru"}}}) {
        group(field: frontmatter___tags) {
          tag: fieldValue
          totalCount
        }
      }
  }   
  `)
  if (tagsRu.errors) {
    return reporter.panicOnBuild("Error while running GraphQL query")
  }
  tagsRu.data.allMarkdownRemark.group.forEach(group => {
    createPage({
      path: `/ru/blog/tags/${group.tag}`,
      component: tagPage,
      context: {...group, lang: 'ru'}
    })
  })

}

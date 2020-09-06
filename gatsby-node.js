const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: `src/pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
  {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
  }
`)

result.data.allMarkdownRemark.edges.forEach(({ node }) => {

  createPage({
    path: node.fields.slug,
    component: path.resolve(__dirname, 'src/templates/blog-post.js'),
    context: {
      slug: node.fields.slug
    }
  })
});
console.log(JSON.stringify(result, null, 4))
}
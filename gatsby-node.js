const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagPage = path.resolve(`./src/templates/tag-page.js`)

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges
    const tagSet = new Set();

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      console.log(post.node.fields)
      // Get tags for tags pages.
      if (post.node.frontmatter.tags) {
        post.node.frontmatter.tags.forEach(tag => {
          tagSet.add(tag);
        });
      }

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    // Create tags pages.
    tagSet.forEach(tag => {
      createPage({
        path: `/tags/${tag}/`,
        component: tagPage,
        context: {
          tag
        }
      });
    });


    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {

    if (typeof node.frontmatter.slug !== 'undefined') {
      createNodeField({
        node,
        name: 'slug',
        value: `/post/${node.frontmatter.slug}`,
      });
    } else {
      const value = createFilePath({ node, getNode })
      createNodeField({
        node,
        name: 'slug',
        value: `/post/${_.kebabCase(node.frontmatter.title)}`,
      });
    }
  }
}
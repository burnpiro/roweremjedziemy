import React from "react"
import {graphql, Link} from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import SimilarArticles from "../components/SimilarArticles";

class BlogPostTemplate extends React.Component {
  render() {
    console.log(this.props.data.markdownRemark)
    const {
      excerpt,
      fields: {
        slug,
        part,
      },
      html,
      frontmatter: {
        title,
        date,
        timestamp,
        description,
        tags,
        thumbnail,
      }
    } = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle} backgroundImage={thumbnail ? thumbnail.childImageSharp.fluid.src : undefined}>
        <SEO
          title={title}
          description={description || excerpt}
        />
        <article
          className={`post-content ${thumbnail ? 'no-image' : `no-image`}`}
        >
          <header className="post-content-header">
            <h1 className="post-content-title">{title}</h1>
          </header>

          {description && (
            <p className="post-content-excerpt">{description}</p>
          )}

          <div
            className="post-content-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <footer className="post-content-footer">

            <div className="tag-container">
              {tags.map( tag => {
                return(
                  <Link
                    key={tag}
                    style={{ textDecoration: "none" }}
                    to={`/tags/${tag}`}
                  >
                    <div className="tag-item">#{tag}</div>
                  </Link>
                )
              })}
            </div>
            <SimilarArticles tags={tags} currentArticleSlug={slug} currentArticleDate={timestamp} currentArticlePart={part} />
            {/* There are two options for how we display the byline/author-info.
        If the post has more than one author, we load a specific template
        from includes/byline-multiple.hbs, otherwise, we just use the
        default byline. */}
          </footer>
        </article>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      fields {
        slug
        part
      }
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        timestamp: date(formatString: "X")
        description
        tags
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 1360) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

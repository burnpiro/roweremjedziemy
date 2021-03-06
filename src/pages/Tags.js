import React from "react"
import { Link } from "gatsby";
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"

import "../style/normalize.css"
import "../style/all.scss"

const TagIndex = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const tags = data.allMarkdownRemark.distinct

  return (
    <Layout title={siteTitle}>
      <SEO
        title="Tagi"
      />
      <header className="tag-page-head">
          <h1 className="page-head-title">Tagi ({tags.length})</h1>
      </header>
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
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
      distinct(field: frontmatter___tags)
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <TagIndex props data={data} />
    )}
  />
)

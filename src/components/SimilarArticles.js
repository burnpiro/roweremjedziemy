import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import ArticleCard from './ArticleCard'
import { SimilarArticlesFactory, getPartData } from './SimilarArticlesFactory'

const SimilarArticlesComponent = ({ articles }) => (
  <section className="similar-articles">
    {articles.map((article, i) => (
      <ArticleCard {...article} key={i}/>
    ))}
  </section>
)

// (1.) Query for articles
export default (props) => (
  <StaticQuery
    query={graphql`
      query SimilarArticles {    
        posts: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                part
              }
              frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                timestamp: date(formatString: "X")
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
        }
      }
    `}
    render={data => {
      const { tags, currentArticleSlug, currentArticleDate, currentArticlePart } = props;

      // (2.) Marshall the response into articles
      const articles = data.posts.edges.map(edge => ({
        slug: edge.node.fields.slug,
        part: getPartData(edge.node.fields.part),
        ...edge.node.frontmatter
      }));

      // (3.) Use a SimilarArticlesFactory to get my similar articles
      const similarArticles = new SimilarArticlesFactory(
        articles, currentArticleSlug, currentArticleDate, getPartData(currentArticlePart)
      )
        .setMaxArticles(4)
        .setTags(tags)
        .getArticles()


      // (4.) Render it
      return (
        <SimilarArticlesComponent articles={similarArticles} />
      )
    }}
  />
)
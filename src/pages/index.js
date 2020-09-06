import React from "react"
import Layout from '../components/layout';
import { graphql, Link } from 'gatsby';

export default function Home({ data }) {
  const posts = data.allMarkdownRemark.edges.map(({ node }) => {
    const { title, description } = node.frontmatter;
    return (
      <li key={node.id}>
        <Link to={node.fields.slug}>{title}</Link>
        <p>{description}</p>
      </li>
    );
  });

  return (
    <Layout>
      <ul>
        {posts}
      </ul>
    </Layout>
  );
}

export const query = graphql`
  {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            description
            title
          }
        }
      }
    }
  }
`
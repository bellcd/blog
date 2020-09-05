import React from "react"
import Layout from '../components/layout';
import { graphql } from 'gatsby';

export default function Home({ data }) {
  console.log('data: ', data);
  return (
    <Layout>
       <h1>{data.site.siteMetadata.title}</h1>
      <div>
        <img
          src="https://2.bp.blogspot.com/-BMP2l6Hwvp4/TiAxeGx4CTI/AAAAAAAAD_M/XlC_mY3SoEw/s1600/panda-group-eating-bamboo.jpg"
          alt="Group of pandas eating bamboo"
        />
      </div>
    </Layout>
  );
}

export const query = graphql`
  {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            description
            title
            date
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  padding: 1rem;
`

const StyledSocialLinks = styled.div`
  display: flex;
  justify-content: space-between;
`

export default function Footer() {
  const data = useStaticQuery(graphql`
  {
    site {
      siteMetadata {
        author {
          name
          summary
        }
        social {
          linkedin
          portfolio
        }
        description
      }
    }
  }
`);
  const {
    siteMetadata: {
      author: {
        name, summary
      },
      social: {
        linkedin,
        portfolio
      }
    }
  } = data.site;

  return (
  <StyledFooter>
    {`Made with ❤️ by ${name}.`} {summary}
    <StyledSocialLinks>
      <a href={`https://www.linkedin.com/in/${linkedin}`}>LinkedIn</a>
      <a href={portfolio}>Portfolio</a>
    </StyledSocialLinks>
  </StyledFooter>
  );
}
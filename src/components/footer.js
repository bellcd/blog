import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  padding: 1rem;
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
        linkedin
      }
    }
  } = data.site;
  return (
  <StyledFooter>
    {`Made with ❤️ by ${name}.`} {summary}
    <div>
      <a href={`https://www.linkedin.com/in/${linkedin}`}>LinkedIn</a>
    </div>
  </StyledFooter>
  );
}
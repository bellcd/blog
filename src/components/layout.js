import React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Footer from './footer';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
`

const StyledLi = styled.li`
  // list-style: none;
  display: inline-block;
  padding-left: 1rem;
`
const StyledUl = styled.ul`
  display: flex;
`
const LinkToOverwrite = ({ to, children }) => (
  <StyledLi>
    <Link to={to}>{children}</Link>
  </StyledLi>
);

const StyledLink = styled(LinkToOverwrite)`
  background-color: pink;
`

const MainContent = styled.div`
  padding: 0 1rem;
`

export default function Layout({ children }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );
  return (
    <Container>
      <Header>
        <Link to="/"><h3>{data.site.siteMetadata.title}</h3></Link>
        {/* // TODO: leaving out multi page navigation for now */}
        {/* <StyledUl>
          <StyledLink to="/"><h3>Home</h3></StyledLink>
          <StyledLink to="/about"><h3>About</h3></StyledLink>
          <StyledLink to="/contact"><h3>Contact</h3></StyledLink>
        </StyledUl> */}
      </Header>
      <MainContent>
        {children}
      </MainContent>
      <Footer></Footer>
    </Container>
  );
}
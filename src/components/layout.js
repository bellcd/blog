import React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const Container = styled.div`
  background-color: red;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px 1fr 100px;
  height: 100vh;
  overflow: auto;
`
const Header = styled.header`
  background-color: blue;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
`
const Footer = styled.footer`
  background-color: darkseagreen;
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
        <Link to="/"><h3>My Site</h3></Link>
        {/* // TODO: leaving out multi page navigation for now */}
        {/* <StyledUl>
          <StyledLink to="/"><h3>Home</h3></StyledLink>
          <StyledLink to="/about"><h3>About</h3></StyledLink>
          <StyledLink to="/contact"><h3>Contact</h3></StyledLink>
        </StyledUl> */}
      </Header>
      <MainContent>
        {data.site.siteMetadata.title}
        {children}
      </MainContent>
      <Footer>Made by Christian Dibala Bell</Footer>
    </Container>
  );
}
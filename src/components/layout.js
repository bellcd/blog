import React from "react"
import { Link } from 'gatsby';

const ListLink = ({ to, children }) => (
  <li
    style={{
      display: 'inline-block',
      marginRight: '1rem'
    }}
  >
    <Link to={to}>{children}</Link>
  </li>
);

export default function Layout({ children }) {
  return (
    <div
      style={{
        margin: `3rem auto`,
        maxWidth: 650,
        padding: `0 1rem`
      }}>
      <header style={{
        marginBottom: '1rem'
      }}
      >
        <Link to="/">
          <h3>My Site</h3>
        </Link>
        <ul style={{
          listStyle: 'none',
          float: 'right'
        }}
        >
          <ListLink to="/">Home</ListLink>
          <ListLink to="/about">About</ListLink>
          <ListLink to="/contact">Contact</ListLink>
        </ul>
      </header>
      {children}
    </div>
  )
}
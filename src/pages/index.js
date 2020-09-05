import React from "react"
import { Link } from 'gatsby';
import Header from '../components/header';

export default function Home() {
  return (
    <div>
      <div>Hello Christian!</div>
      <Link to="/contact">Contact</Link>
    </div>
  );
}

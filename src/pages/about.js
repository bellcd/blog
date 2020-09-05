import React from 'react';
import Header from '../components/header';
import Layout from '../components/layout';

export default function About() {
  return (
    <Layout>
      <Header headerText={"About Gatsby"}></Header>
      <p>more content here</p>
    </Layout>
  )
}
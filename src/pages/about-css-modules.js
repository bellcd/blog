import React from 'react';
import Container from '../components/container';
import styles from './about-css-modules.module.css';

const User = ({ username, avatar, excerpt }) => (
  <div className={styles.user}>
    <img src={avatar} className={styles.avatar} alt="" />
    <div className={styles.description}>
      <h2 className={styles.username}>{username}</h2>
      <p className={styles.excerpt}>{excerpt}</p>
    </div>
  </div>
);

export default function About() {
  return (
    <Container>
      <h1>About CSS modules</h1>
      <p>Should I be using modules?</p>

      <User
        username="Jane Doe"
        avatar="https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg"
        excerpt="I'm Jane Doe. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
      />
      <User
        username="Bob Smith"
        avatar="https://s3.amazonaws.com/uifaces/faces/twitter/vladarbatov/128.jpg"
        excerpt="I'm Bob Smith, a vertically aligned type of guy. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
      />
    </Container>
  );
}
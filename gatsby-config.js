/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Christian Bell`,
    author: {
      name: `Christian Dibala Bell`,
      summary: `I'm a Full Stack Developer who loves finding out why a thing works the way it does. Also music, fitness, & Kurzgesagt.`,
    },
    description: `A collection of my explorations & thoughts on development. Opinions are my own.`,
    siteUrl: `https://`,
    social: {
      linkedin: 'christian-dibala-bell/',
      portfolio: 'https://bellcd.github.io/'
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-prismjs`
        ]
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      },
    },
  ],
}

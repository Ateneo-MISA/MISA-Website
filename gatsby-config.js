require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const environment = process.env.GATSBY_ENV

module.exports = {
  siteMetadata: {
    title: 'Ateneo Management Information Systems Association',
    description: 'Ateneo MISA',
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
        environment: 'master',
      },
    },
  ],
}

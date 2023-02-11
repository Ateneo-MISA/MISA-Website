const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve('./src/templates/blog-post.js')

  const result = await graphql(
    `
      {
        allContentfulBlogPost {
          nodes {
            title
            slug
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulBlogPost.nodes

  // Create blog posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostSlug = index === 0 ? null : posts[index - 1].slug
      const nextPostSlug =
        index === posts.length - 1 ? null : posts[index + 1].slug

      createPage({
        path: `/blog/${post.slug}/`,
        component: blogPost,
        context: {
          slug: post.slug,
          previousPostSlug,
          nextPostSlug,
        },
      })
    })
  }

  const specificEventTemplate = path.resolve(
    './src/templates/specific-event.js'
  )
  const specificEventsResult = await graphql(`
    {
      allContentfulMainEvents {
        nodes {
          title
          hero {
            gatsbyImage(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
            resize(height: 630, width: 1200) {
              src
            }
            file {
              url
            }
          }
          tagline
          description {
            description
          }
          testimonials {
            fullName
            eventAndYear
            body {
              body
            }
          }
          activeRegistration
          highlights {
            gatsbyImage(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
            resize(height: 630, width: 1200) {
              src
            }
            file {
              url
            }
          }
        }
      }
    }
  `)

  const specificEvents = specificEventsResult.data.allContentfulMainEvents.nodes

  if (specificEvents.length > 0) {
    for (let i = 0; i < specificEvents.length; i++) {
      let pageURL = specificEvents[i].title
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase()

      createPage({
        path: `/events/${pageURL}`,
        component: specificEventTemplate,
        context: {
          specificEventData: specificEvents[i],
        },
      })
    }
  }

  const hexaCardPage = path.resolve('./src/templates/hexa-card.js')

  // query MyQuery {
  //   allContentfulHexaCard {
  //     nodes {
  //       benefits
  //       endDate
  //       startDate
  //       partnerName
  //     }
  //   }
  // }

  const hexaCardResult = await graphql(`
    query MyQuery {
      allContentfulHexaCard {
        nodes {
          benefits
          partnerName
          partnerLogo {
            gatsbyImage(
              aspectRatio: 1.5
              backgroundColor: ""
              breakpoints: 10
              cropFocus: CENTER
              fit: COVER
              formats: AUTO
              height: 130
              layout: FIXED
              outputPixelDensities: 1.5
              placeholder: DOMINANT_COLOR
              quality: 10
              sizes: ""
              width: 130
            )
            file {
              url
            }
          }
          startDate
          endDate
        }
      }
    }
  `)

  const hexaCardPartner = hexaCardResult.data.allContentfulHexaCard.nodes

  createPage({
    path: `/partnerships/hexa-card`,
    component: hexaCardPage,
    context: {
      hexaCardData: hexaCardPartner,
    },
  })
}

const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

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
}

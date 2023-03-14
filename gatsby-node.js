const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // renders and builds pages based on Contentful model Website Pages
  const ALL_CONTENFUL_WEBSITE_PAGES = await graphql(`
    query WebsitePages {
      allContentfulWebsitePages {
        nodes {
          name
          activeOnWebsite
          path
          outerFolderName
          innerFolderName
          templateBased
        }
      }
    }
  `)

  const allActivePages =
    ALL_CONTENFUL_WEBSITE_PAGES.data.allContentfulWebsitePages.nodes

  for (let i = 0; i < allActivePages?.length; i++) {
    // only creates page if activeOnWebsite attribute of object is true
    if (allActivePages[i]?.activeOnWebsite) {
      // checks if template based, meaning multiple pages generated per
      if (allActivePages[i]?.templateBased) {
        if (allActivePages[i]?.name === 'Election Candidates') {
          const candidateTemplate = path.resolve('./src/templates/Candidate.js')
          const candidatesResult = await graphql(`
            {
              allContentfulElectionCandidates {
                nodes {
                  name
                  position
                  vision {
                    vision
                  }
                  image {
                    file {
                      url
                    }
                  }
                  platforms {
                    raw
                  }
                }
              }
            }
          `)

          const candidates =
            candidatesResult.data.allContentfulElectionCandidates.nodes

          candidates.map((candidate) => {
            const { name } = candidate
            const slug = name
              .replace(/([a-z])([A-Z])/g, '$1-$2')
              .replace(/[\s_]+/g, '-')
              .toLowerCase()

            createPage({
              path: `/elections/${slug}`,
              component: candidateTemplate,
              context: { candidate },
            })
          })
        }
      }
      if (allActivePages[i]?.name === 'Specific Events') {
        const specificEventTemplate = path.resolve(
          './src/templates/SpecificEvent.js'
        )
        const specificEventsResult = await graphql(`
          {
            allContentfulMainEvents {
              nodes {
                title
                hero {
                  gatsbyImage(
                    layout: FULL_WIDTH
                    placeholder: BLURRED
                    width: 1280
                  )
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
                  gatsbyImage(
                    layout: FULL_WIDTH
                    placeholder: BLURRED
                    width: 1280
                  )
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

        const specificEvents =
          specificEventsResult.data.allContentfulMainEvents.nodes

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
      } else {
        if (allActivePages[i]?.innerFolderName) {
          createPage({
            path: `/${allActivePages[i]?.path}`,
            component: path.resolve(
              `./src/components/${allActivePages[i]?.outerFolderName}/${allActivePages[i]?.innerFolderName}/index.js`
            ),
          })
        } else {
          createPage({
            path: `/${allActivePages[i]?.path}`,
            component: path.resolve(
              `./src/components/${allActivePages[i]?.outerFolderName}/index.js`
            ),
          })
        }
      }
    }
  }
}

import { useStaticQuery, graphql } from 'gatsby'

const ALL_CONTENFUL_WEBSITE_PAGES = graphql`
  query WebsitePages {
    allContentfulWebsitePages {
      nodes {
        name
        activeOnWebsite
        navbarItem
        navbarOrder
        path
        homeCarouselTitle
        homeCarouselSubtitle
        homeCarouselImage {
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
`

const useContentfulWebsitePages = () => {
  const data = useStaticQuery(ALL_CONTENFUL_WEBSITE_PAGES)

  return data?.allContentfulWebsitePages?.nodes
}

export default useContentfulWebsitePages

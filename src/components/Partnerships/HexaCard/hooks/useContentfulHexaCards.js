import { useStaticQuery, graphql } from 'gatsby'

const ALL_CONTENTFUL_HEXA_CARDS = graphql`
  query ContentfulHexaCard {
    allContentfulHexaCard {
      nodes {
        category {
          name
        }
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
`

const useContentfulHexaCards = () => {
  const data = useStaticQuery(ALL_CONTENTFUL_HEXA_CARDS)

  return data?.allContentfulHexaCard?.nodes
}

export default useContentfulHexaCards

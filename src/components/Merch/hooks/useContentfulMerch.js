import { useStaticQuery, graphql } from 'gatsby'

const ALL_CONTENTFUL_MERCH = graphql`
  query ContentfulMerch {
    allContentfulMerch {
      nodes {
        name
        price
        photo {
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
      }
    }
  }
`

const useContentfulMerch = () => {
  const data = useStaticQuery(ALL_CONTENTFUL_MERCH)

  return data?.allContentfulMerch?.nodes
}

export default useContentfulMerch

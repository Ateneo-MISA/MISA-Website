import { useStaticQuery, graphql } from 'gatsby'

const ALL_CONTENTFUL_ELECTION_CANDIDATES = graphql`
  query ElectionCandidates {
    allContentfulElectionCandidates {
      nodes {
        name
        position {
          title
        }
        image {
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

const useElectionCandidates = () => {
  const data = useStaticQuery(ALL_CONTENTFUL_ELECTION_CANDIDATES)

  return data?.allContentfulElectionCandidates?.nodes
}

export default useElectionCandidates

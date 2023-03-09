import { useStaticQuery, graphql } from 'gatsby'

const ALL_CONTENTFUL_ELECTION_POSITIONS = graphql`
  query ElectionPositions {
    allContentfulElectionPositions {
      nodes {
        title
        activeOnWebsite
        orderOnWebsite
      }
    }
  }
`

const useContentfulElectionPositions = () => {
  const data = useStaticQuery(ALL_CONTENTFUL_ELECTION_POSITIONS)

  return data?.allContentfulElectionPositions?.nodes
}

export default useContentfulElectionPositions

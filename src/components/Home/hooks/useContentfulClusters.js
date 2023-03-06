import { useStaticQuery, graphql } from 'gatsby'

const ALL_CONTENTFUL_CLUSTERS = graphql`
  query ContentfulClusters {
    allContentfulCluster {
      nodes {
        name
      }
    }
  }
`

const useContentfulClusters = () => {
  const data = useStaticQuery(ALL_CONTENTFUL_CLUSTERS)

  return data?.allContentfulCluster?.nodes
}

export default useContentfulClusters

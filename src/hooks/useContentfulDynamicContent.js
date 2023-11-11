import { useStaticQuery, graphql } from 'gatsby'

const ALL_CONTENTFUL_DYNAMIC_CONTENT = graphql`
  query DynamicContent {
    allContentfulDynamicContent {
      nodes {
        name
        date
        image {
          file {
            url
          }
        }
        content {
          content
        }
      }
    }
  }
`

const useContentfulDynamicContent = () => {
  const data = useStaticQuery(ALL_CONTENTFUL_DYNAMIC_CONTENT)

  return data?.allContentfulDynamicContent?.nodes
}

export default useContentfulDynamicContent

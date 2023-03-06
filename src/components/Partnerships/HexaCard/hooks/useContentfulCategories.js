import { useStaticQuery, graphql } from 'gatsby'

const ALL_CONTENTFUL_CATEGORIES = graphql`
  query ContentfulCategory {
    allContentfulCategory {
      nodes {
        name
      }
    }
  }
`

const useContentfulCategories = () => {
  const data = useStaticQuery(ALL_CONTENTFUL_CATEGORIES)

  return data?.allContentfulCategory?.nodes
}

export default useContentfulCategories

import { useStaticQuery, graphql } from 'gatsby'

const ALL_CONTENFUL_WEBSITE_PAGES = graphql`
  query WebsitePages {
    allContentfulWebsitePages {
      nodes {
        name
        activeOnWebsite
        navbarItem
        path
      }
    }
  }
`

const useContentfulWebsitePages = () => {
  const data = useStaticQuery(ALL_CONTENFUL_WEBSITE_PAGES)

  return data?.allContentfulWebsitePages?.nodes
}

export default useContentfulWebsitePages

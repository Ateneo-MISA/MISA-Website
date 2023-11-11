import { useStaticQuery, graphql } from 'gatsby'

const ALL_SERVICES_PROJECTS = graphql`
  query ServicesProjects {
    allContentfulEServicesProjects {
      nodes {
        link
        image {
          file {
            url
          }
        }
        title
      }
    }
  }
`

const useContentfulServicesProjects = () => {
  const data = useStaticQuery(ALL_SERVICES_PROJECTS)

  return data?.allContentfulEServicesProjects?.nodes
}

export default useContentfulServicesProjects

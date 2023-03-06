import { useStaticQuery, graphql } from 'gatsby'

const ALL_CONTENTFUL_EVENTS = graphql`
  query ContentfulEvents {
    allContentfulEvent {
      nodes {
        title
        location
        date(formatString: "MM/DD/YYYY")
        startTime
        endTime
        link
        clusters {
          name
        }
      }
    }
  }
`

const useContentfulEvents = () => {
  const data = useStaticQuery(ALL_CONTENTFUL_EVENTS)

  return data?.allContentfulEvent?.nodes
}

export default useContentfulEvents

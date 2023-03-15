import { useStaticQuery, graphql } from 'gatsby'

const ALL_CONTENTFUL_ANNOUNCEMENTS = graphql`
  query Announcements {
    allContentfulAnnouncements {
      nodes {
        title
        body
        link
        startDate
        endDate
      }
    }
  }
`

const useContentfulAnnouncements = () => {
  const data = useStaticQuery(ALL_CONTENTFUL_ANNOUNCEMENTS)

  return data?.allContentfulAnnouncements?.nodes
}

export default useContentfulAnnouncements

import { useStaticQuery, graphql } from 'gatsby'

const ALL_CONTENTFUL_MERCH_FAQ = graphql`
  query ContentfulMerchFaq {
    allContentfulMerchFaq {
      nodes {
        answer {
          answer
        }
        question
      }
    }
  }
`

const useContentfulMerchFAQ = () => {
  const data = useStaticQuery(ALL_CONTENTFUL_MERCH_FAQ)

  return data?.allContentfulMerchFaq?.nodes
}

export default useContentfulMerchFAQ

import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import Hero from '../components/hero'
import UpcomingEvents from '../components/upcoming-events'

class RootIndex extends React.Component {
  render() {
    const events = get(this, 'props.data.allContentfulEvent.nodes')
    const clusters = get(this, 'props.data.allContentfulCluster.nodes')

    return (
      <Layout location={this.props.location}>
        <Hero />
        <UpcomingEvents events={events} clusters={clusters} />
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
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
    allContentfulCluster {
      nodes {
        name
      }
    }
  }
`

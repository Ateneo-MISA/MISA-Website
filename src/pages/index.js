import React from 'react'

import Layout from '../components/Layout/index'
import Hero from '../components/Home/Hero'
import UpcomingEvents from '../components/Home/UpcomingEvents'
import HomeCarousel from '../components/Home/HomeCarousel'

class RootIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <Hero />
        <HomeCarousel />
        <UpcomingEvents />
      </Layout>
    )
  }
}

export default RootIndex

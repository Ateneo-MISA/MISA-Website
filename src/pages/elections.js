import React from 'react'

import Layout from '../components/Layout/index'
import Elections from '../components/Elections'

class RootIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <Elections />
      </Layout>
    )
  }
}

export default RootIndex

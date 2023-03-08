import React from 'react'
import { navigate } from 'gatsby'

import Layout from '../../components/Layout/index'

import useContentfulWebsitePages from '../../hooks/useContentfulWebsitePages'

const Promotions = () => {
  let isActive = useContentfulWebsitePages().filter((page) => {
    return page?.name === 'Partnerships/Promotions'
  })[0]?.activeOnWebsite

  return isActive ? (
    <Layout>
      <div>promotions</div>
    </Layout>
  ) : (
    navigate('/')
  )
}

export default Promotions

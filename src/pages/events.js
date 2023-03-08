import React from 'react'
import { navigate } from 'gatsby'

import Layout from '../components/Layout/index'

import useContentfulWebsitePages from '../hooks/useContentfulWebsitePages'

const Events = () => {
  let isActive = useContentfulWebsitePages().filter((page) => {
    return page?.name === 'Events'
  })[0]?.activeOnWebsite

  return isActive ? (
    <Layout>
      <div>events</div>
    </Layout>
  ) : (
    navigate('/')
  )
}

export default Events

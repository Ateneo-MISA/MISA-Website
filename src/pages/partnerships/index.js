import React from 'react'
import { navigate } from 'gatsby'

import Layout from '../../components/Layout/index'

import useContentfulWebsitePages from '../../hooks/useContentfulWebsitePages'

const Partnerships = () => {
  let isActive = useContentfulWebsitePages().filter((page) => {
    return page?.name === 'Partnerships'
  })[0]?.activeOnWebsite

  return isActive ? (
    <Layout>
      <div>partnerships</div>
    </Layout>
  ) : (
    navigate('/')
  )
}

export default Partnerships

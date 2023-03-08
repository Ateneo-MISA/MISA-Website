import React from 'react'
import { navigate } from 'gatsby'

import Layout from '../../components/Layout/index'

import useContentfulWebsitePages from '../../hooks/useContentfulWebsitePages'

const Partners = () => {
  let isActive = useContentfulWebsitePages().filter((page) => {
    return page?.name === 'Partnerships/Partners'
  })[0]?.activeOnWebsite

  return isActive ? (
    <Layout>
      <div>partners</div>
    </Layout>
  ) : (
    navigate('/')
  )
}

export default Partners

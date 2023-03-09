import React from 'react'

import '../../../static/styles/variables.css'
import '../../../static/styles/global.css'
import Seo from './SEO'
import Navigation from './Navbar'
import Footer from './Footer'
class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
      <>
        <Seo />
        <Navigation />
        <main className="font-montserrat">{children}</main>
        <Footer />
      </>
    )
  }
}

export default Template

import React from 'react'

import '../../../static/styles/variables.css'
import '../../../static/styles/global.css'
import Seo from './SEO'
import Navigation from './Navbar'
import Footer from './Footer'
import Announcement from './Announcement'

const Template = (children) => {
  return (
    <div className="min-h-screen">
      <Seo />
      <Announcement />
      <Navigation />
      <main className="font-montserrat min-h-screen">{children?.children}</main>
      <Footer />
    </div>
  )
}

export default Template

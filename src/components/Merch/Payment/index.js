import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

import Layout from '../../../components/Layout/index'

const Payment = () => {
  return (
    <Layout>
      <div className="m-12">
        <div className="flex">
          <StaticImage
            class="w-[50px] h-[50px] mr-4"
            src="../../../../static/images/merchPayment.png"
          />
          <p className="text-5xl font-extrabold">Merch Payment</p>
        </div>
        <iframe
          className="airtable-embed w-full min-h-screen"
          src="https://airtable.com/embed/shre3nTO7P1ecSLHF?backgroundColor=purple"
        />
      </div>
    </Layout>
  )
}

export default Payment

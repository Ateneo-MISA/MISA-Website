import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReceipt } from '@fortawesome/free-solid-svg-icons'

import Layout from '../../../components/Layout/index'

const Payment = () => {
  return (
    <Layout>
      <div className="m-12">
        <div className="flex">
          <FontAwesomeIcon
            className="w-[50px] h-[50px] mr-4 text-[#2097A2]"
            icon={faReceipt}
          />
          <p className="text-5xl font-extrabold">Merch Payment</p>
        </div>
        <p className="mt-2">
          Please wait for the form to load to upload your proof of payment.
        </p>
        <iframe
          title="Airtable Payment Form"
          className="airtable-embed w-full min-h-screen"
          src="https://airtable.com/embed/shre3nTO7P1ecSLHF?backgroundColor=purple"
        />
      </div>
    </Layout>
  )
}

export default Payment

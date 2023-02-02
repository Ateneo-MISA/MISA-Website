import React from 'react'

import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'

const HexaCard = () => {
  return (
    <Layout>
      {/* Hero Frame */}
      <div className="bg-navbarBlack flex-none lg:flex">
        <StaticImage
          className="pl-24 pr-24 pt-48 lg:pt-0"
          src="../../static/images/hexacardhero.png"
        />
        <div className="font-abc mr-0 lg:mr-28 mt-4 lg:mt-36 text-center lg:text-left px-24 lg:px-0">
          <h1 className="text-5xl font-extrabold text-white mb-6">
            Meet the HEXA Card
          </h1>
          <p className="text-xl text-[#D9E8EC] mb-14">
            This site serves as your access to the member perks and special
            offers exclusive to members of MISA! So what are you waiting for?
            Meet our partners now!
          </p>
          <button className="items-center bg-misaTeal text-white py-2 px-4 text-xl rounded-lg m-auto text-center mb-36">
            Learn More
          </button>
        </div>
      </div>

      {/* HEXA Card Partners Frame */}
      <div className="font-abc">
        <div className="ml-24">
          <h1 className="text-5xl font-extrabold mt-20">
            <span className="text-misaTeal">HEXA Card</span> Partners
          </h1>
        </div>
      </div>
    </Layout>
  )
}

export default HexaCard

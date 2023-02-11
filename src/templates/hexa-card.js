import React from 'react'

import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'
import { GatsbyImage } from 'gatsby-plugin-image'
import moment from 'moment'

const HexaCard = ({ pageContext }) => {
  const hexaCardData = pageContext.hexaCardData
  

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
        <div className="text-center md:text-left lg:text-left md:ml-24 lg:ml-24">
          <h1 className="text-5xl font-extrabold mt-20">
            <span className="text-misaTeal">HEXA Card</span> Partners
          </h1>
        </div>
      </div>

      {console.log(hexaCardData)}

      {console.log(hexaCardData[0].partnerLogo.file)}

      <div className="flex flex-col min-[1160px]:flex-row items-center lg:justify-around">
        {hexaCardData.map((partner) => {
          return (
            <div className="bg-[url('../../static/images/hexacard.png')] bg-cover bg-no-repeat w-[496px] h-[233px] py-10 pl-8 pr-14 md:m-5 lg:m-10 scale-75 md:scale-100 lg:scale-[110%] lg:hover:scale-[115%] text-white">
              <div className="flex flex-row ">
                <div className="flex-none w-1/3 mt-2 mr-5">
                  <GatsbyImage
                    image={partner.partnerLogo.gatsbyImage}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold">
                    {partner.partnerName}
                  </h3>
                  <p className="text-base overflow-clip h-[100px]">{partner.benefits}</p>
                  <p className="text-base">
                    {moment(partner.startDate).format('MMM D, YYYY')} -- {moment(partner.endDate).format('MMM D, YYYY')}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default HexaCard

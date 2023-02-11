import React, { useState } from 'react'
import { graphql } from 'gatsby'

import Layout from '../../components/layout'
import { StaticImage } from 'gatsby-plugin-image'
import { GatsbyImage } from 'gatsby-plugin-image'
import moment from 'moment'

const HexaCard = ({ data }) => {
  const [selected, setSelected] = useState('All')

  const hexaCardData = data.allContentfulHexaCard.nodes
  let finalHexaCardData = []
  for (let i = 0; i < hexaCardData.length; i++) {
    let categories = []
    for (let j = 0; j < hexaCardData[i].category.length; j++) {
      categories.push(hexaCardData[i].category[j].name)
    }
    finalHexaCardData.push({
      ...hexaCardData[i],
      categories,
    })
  }

  const filteredData = finalHexaCardData.filter((hexaCardPartner) => {
    return selected === 'All'
      ? true
      : hexaCardPartner?.categories?.includes(selected)
  })

  const categoryData = data.allContentfulCategory.nodes
  let finalCategoryData = ['All']
  for (let i = 0; i < categoryData.length; i++) {
    finalCategoryData.push(categoryData[i].name)
  }

  return (
    <Layout>
      {/* Hero Frame */}
      <div className="bg-navbarBlack flex-none 2xl:flex">
        <StaticImage
          className="pl-24 pr-24 pt-48 w-full 2xl:w-2/3"
          src="../../../static/images/hexacardhero.png"
        />
        <div className="font-abc mr-0 2xl:mr-28 mt-4 2xl:mt-36 text-center 2xl:text-left px-24 2xl:px-0">
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
        <div className="text-left mx-12 md:mx-24">
          <h1 className="text-5xl font-extrabold mt-20">
            <span className="text-misaTeal">HEXA Card</span> Partners
          </h1>
        </div>
      </div>

      {/* Options */}
      <div className="flex gap-4 my-4 flex-wrap text-center mx-12 md:mx-24">
        {finalCategoryData.map((header, index) => {
          return (
            <div
              className={`${
                selected === header
                  ? 'bg-[#2096A1] text-white'
                  : 'text-[#2096A1] bg-[#D9E8EC]'
              } py-2 px-4 rounded-xl hover:cursor-pointer hover:bg-[#2096A1] hover:text-white duration-200`}
              onClick={() => setSelected(header)}
              key={index}
            >
              {header}
            </div>
          )
        })}
      </div>
      {filteredData?.length == 0 && (
        <div className="pl-24 ">No partners of such category</div>
      )}

      <div className="flex flex-col min-[1160px]:flex-row items-center lg:justify-around">
        {filteredData.map((partner) => {
          return (
            <div className="bg-[url('../../static/images/hexacard.png')] bg-cover bg-no-repeat w-[496px] h-[233px] py-10 pl-8 pr-14 md:m-5 lg:m-10 scale-75 md:scale-100 lg:scale-[110%] lg:hover:scale-[115%] text-white">
              <div className="flex flex-row ">
                <div className="flex-none w-1/3 mt-2 mr-5">
                  <GatsbyImage image={partner.partnerLogo.gatsbyImage} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold">
                    {partner.partnerName}
                  </h3>
                  <p className="text-base overflow-clip h-[100px]">
                    {partner.benefits}
                  </p>
                  <p className="text-base">
                    {moment(partner.startDate).format('MMM D, YYYY')} -{' '}
                    {moment(partner.endDate).format('MMM D, YYYY')}
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

export const pageQuery = graphql`
  query MyQuery {
    allContentfulCategory {
      nodes {
        name
      }
    }
    allContentfulHexaCard {
      nodes {
        category {
          name
        }
        benefits
        partnerName
        partnerLogo {
          gatsbyImage(
            aspectRatio: 1.5
            backgroundColor: ""
            breakpoints: 10
            cropFocus: CENTER
            fit: COVER
            formats: AUTO
            height: 130
            layout: FIXED
            outputPixelDensities: 1.5
            placeholder: DOMINANT_COLOR
            quality: 10
            sizes: ""
            width: 130
          )
          file {
            url
          }
        }
        startDate
        endDate
      }
    }
  }
`

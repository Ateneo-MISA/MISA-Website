import React, { useState } from 'react'

import Layout from '../../components/Layout/index'
import { StaticImage } from 'gatsby-plugin-image'
import { GatsbyImage } from 'gatsby-plugin-image'
import moment from 'moment'

import Button from '../../components/Elements/Button'
import FilterBar from '../../components/Elements/FilterBar'

import useContentfulCategories from '../../components/Partnerships/HexaCard/hooks/useContentfulCategories'
import useContentfulHexaCards from '../../components/Partnerships/HexaCard/hooks/useContentfulHexaCards'

const HexaCard = ({ data }) => {
  const [selected, setSelected] = useState('All')

  let hexaCardData = useContentfulHexaCards()

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

  let categoryData = useContentfulCategories().sort((a, b) =>
    a.name.localeCompare(b.name)
  )
  let finalCategoryData = ['All']
  for (let i = 0; i < categoryData.length; i++) {
    finalCategoryData.push(categoryData[i].name)
  }

  return (
    <Layout>
      {/* Hero Frame */}
      <div className="bg-navbarBlack flex-none 2xl:flex text-center">
        <StaticImage
          className="px-32 ml-0 mt-12 lg:mt-0 lg:ml-32 pt-48 w-1/2 2xl:w-2/3"
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
          <Button variant="primary" className="items-center text-center mb-36">
            Learn More
          </Button>
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
      <FilterBar
        className="mx-12 md:mx-24"
        options={finalCategoryData}
        setSelected={setSelected}
        selected={selected}
      />

      {filteredData?.length === 0 && (
        <div className="text-center mt-9">No partners of such category</div>
      )}

      <div className="flex sm:flex-wrap flex-col min-[1160px]:flex-row items-center lg:justify-around">
        {filteredData.map((partner) => {
          return (
            <div className="bg-[url('../../static/images/hexacard.png')] bg-cover bg-no-repeat w-[596px] h-[280px] py-10 pl-8 pr-14 md:m-5 lg:m-10 max-[557px]:ml-0 max-[500px]:scale-[56%] scale-75 md:scale-100 lg:scale-[110%] lg:hover:scale-[115%] text-white">
              <div className="flex flex-row ">
                <div className="flex-none w-1/3 ml-6 mt-8">
                  <GatsbyImage
                    className="scale-[120%]"
                    image={partner.partnerLogo.gatsbyImage}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold">
                    {partner.partnerName}
                  </h3>
                  <p className="text-base overflow-clip h-[140px]">
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

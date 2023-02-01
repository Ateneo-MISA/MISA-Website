import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

import Layout from '../components/layout'

const SpecificEvent = ({ pageContext }) => {
  const { specificEventData } = pageContext
  console.log(specificEventData)

  return (
    <Layout>
      {/* Hero Image Frame */}
      <GatsbyImage image={specificEventData.hero.gatsbyImage} />

      {/* Tagline and Description Frame */}
      <div className="pl-24 pt-28">
        <div className="w-1/2">
          <h1 className="font-abc text-4xl font-extrabold mb-2">
            {specificEventData.tagline}
          </h1>
          <p className="font-abc text-base mb-28">
            {specificEventData.description.description}
          </p>
        </div>
      </div>

      {/* Highlights Frame */}
      <div className="pt-9 pl-24 bg-[#D9E8EC]">
        <h1 className="font-abc text-4xl text-misaTeal font-extrabold">
          Highlights
        </h1>
      </div>

      {/* Testimonials Frame */}
      <div className="mx-24 mt-16">
        <h1 className="font-abc text-3xl sm:text-4xl font-extrabold mb-6 text-center lg:text-left">
          Testimonials
        </h1>
        <div className="flex-none lg:flex">
          <div className="w-full lg:w-1/3 mr-16 text-center lg:text-left">
            <p className="mb-6 text-xl">
              {specificEventData.testimonials[0].body.body}
            </p>
            <h1 className="text-xl font-extrabold">
              {specificEventData.testimonials[0].fullName}
            </h1>
            <h1 className="text-xl font-extrabold mb-16 lg:mb-0">
              {specificEventData.testimonials[0].eventAndYear}
            </h1>
          </div>
          <div className="w-full lg:w-1/3 mr-16 text-center lg:text-left">
            <p className="mb-6 text-xl">
              {specificEventData.testimonials[1].body.body}
            </p>
            <h1 className="text-xl font-extrabold">
              {specificEventData.testimonials[1].fullName}
            </h1>
            <h1 className="text-xl font-extrabold mb-16 lg:mb-0">
              {specificEventData.testimonials[1].eventAndYear}
            </h1>
          </div>
          <div className="w-full lg:w-1/3 mr-16 text-center lg:text-left">
            <p className="mb-6 text-xl">
              {specificEventData.testimonials[2].body.body}
            </p>
            <h1 className="text-xl font-extrabold">
              {specificEventData.testimonials[2].fullName}
            </h1>
            <h1 className="text-xl font-extrabold">
              {specificEventData.testimonials[2].eventAndYear}
            </h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SpecificEvent

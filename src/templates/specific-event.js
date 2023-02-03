import React from 'react'
import BackgroundImage from 'gatsby-background-image'
import { GatsbyImage } from 'gatsby-plugin-image'
import { convertToBgImage } from 'gbimage-bridge'

import Layout from '../components/layout'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import 'swiper/css'

const SpecificEvent = ({ pageContext }) => {
  const { specificEventData } = pageContext
  const bgImage = convertToBgImage(specificEventData.hero.gatsbyImage)

  return (
    <Layout>
      {/* Hero Image Frame */}
      <BackgroundImage
        className="w-full h-104"
        {...bgImage}
        preserveStackingContext
      >
        <div className="font-abc pt-28 pr-0 lg:pr-24 text-center lg:text-right">
          <h1
            className={`font-extrabold text-5xl text-white ${
              !specificEventData.activeRegistration ? 'pb-72' : ''
            }`}
          >
            {specificEventData.title}
          </h1>
          {specificEventData.activeRegistration ? (
            <button className="border-2 border-solid border-white text-xl px-4 py-2 text-white rounded mt-10 mb-48">
              Register Now
            </button>
          ) : null}
        </div>
      </BackgroundImage>

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
      <div className="pt-9 bg-[#D9E8EC]">
        <h1 className="font-abc text-4xl text-misaTeal font-extrabold pl-0 lg:pl-24 text-center lg:text-left">
          Highlights
        </h1>
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            1024: {
              slidesPerView: '2',
            },
            1536: {
              slidesPerView: '3',
            },
          }}
          speed={200}
          className="mt-7"
          slidesPerView="1"
          loop
          modules={[Autoplay]}
        >
          {specificEventData.highlights.map((highlight) => {
            return (
              <SwiperSlide>
                <GatsbyImage
                  className="w-full h-auto"
                  alt=""
                  image={highlight.gatsbyImage}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
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

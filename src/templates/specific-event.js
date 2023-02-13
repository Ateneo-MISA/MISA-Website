import React from 'react'
import BackgroundImage from 'gatsby-background-image'
import { GatsbyImage } from 'gatsby-plugin-image'
import { convertToBgImage } from 'gbimage-bridge'

import Layout from '../components/layout'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import 'swiper/css'

import Button from '../components/Elements/button'

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
              specificEventData.activeRegistration ? '' : 'pb-96'
            }`}
          >
            {specificEventData.title}
          </h1>

          {specificEventData.activeRegistration ? (
            <Button variant="tertiary" className="mt-9 mb-48">
              Register Now
            </Button>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 lg:gap-x-16 gap-y-12 text-[#282828]">
          {specificEventData.testimonials.map((testimonial) => {
            return (
              <div>
                <p className="mb-6 text-xl text-justify italic">
                  {testimonial.body.body}
                </p>
                <h1 className="text-2xl font-extrabold">
                  {testimonial.fullName}
                </h1>
                <h1 className="text-2xl font-extrabold mb-16 lg:mb-0">
                  {testimonial.eventAndYear}
                </h1>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default SpecificEvent

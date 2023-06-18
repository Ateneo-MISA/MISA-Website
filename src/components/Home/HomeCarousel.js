import React, { useRef } from 'react'
import BackgroundImage from 'gatsby-background-image'
import { convertToBgImage } from 'gbimage-bridge'
import { Link } from 'gatsby'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

import useContentfulWebsitePages from '../../hooks/useContentfulWebsitePages'
import Button from '../Elements/Button'

const HomeCarousel = () => {
  let websitePages = useContentfulWebsitePages()
    ?.filter((page) => {
      return !!page?.navbarItem && page?.activeOnWebsite
    })
    ?.sort((a, b) => {
      return a?.navbarOrder - b?.navbarOrder
    })

  const swiperRef = useRef(null)

  const goToSlide = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index)
    }
  }

  return (
    <div className="mt-5 relative">
      <Swiper
        ref={swiperRef}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={200}
        spaceBetween={50}
        slidesPerView="1"
        loop
        pagination={{
          el: '.swiper-pagination-home',
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
      >
        {websitePages.map((page, index) => {
          const bgImage = convertToBgImage(page.homeCarouselImage.gatsbyImage)
          return (
            <SwiperSlide key={page?.name}>
              <BackgroundImage {...bgImage} preserveStackingContext>
                <div className="flex flex-col text-center items-center min-h-[560px] sm:mx-0 mx-4">
                  <p
                    className="pt-48 text-[#FFFFFF] text-5xl font-extrabold"
                    dangerouslySetInnerHTML={{
                      __html: page?.homeCarouselTitle.replace(
                        'MISA',
                        '<span class="text-misaTeal">MISA</span>'
                      ),
                    }}
                  ></p>
                  <p className="mt-2 text-[#FFFFFF] italic text-xl">
                    {page?.homeCarouselSubtitle}
                  </p>
                  <Link className="mt-10 mb-24" to={`/${page?.path}`}>
                    <Button variant="quaternary">{page?.name}</Button>
                  </Link>
                </div>
              </BackgroundImage>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <div className="swiper-pagination-home max-w-max absolute !left-1/2 !transform !-translate-x-1/2 bottom-[65px] z-20" />
    </div>
  )
}

export default HomeCarousel

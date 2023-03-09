import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

import * as styles from './utils/hero.module.css'

import Button from '../Elements/Button'

import useContentfulWebsitePages from '../../hooks/useContentfulWebsitePages'

const Hero = () => {
  let isEventsActive = useContentfulWebsitePages().filter((page) => {
    return page?.name === 'Events'
  })[0]?.activeOnWebsite

  let isServicesActive = useContentfulWebsitePages().filter((page) => {
    return page?.name === 'Services'
  })[0]?.activeOnWebsite

  return (
    <div className={`${styles.hero} font-abc`}>
      <div
        className={`flex flex-col md:flex-row lg:flex-row pt-20 lg:ml-20 pb-20 lg:pb-10`}
      >
        <div className="flex-initial justify-center text-center">
          <StaticImage
            quality={100}
            className={`${styles.image} max-w-[445.27px] max-h-[446.35px] lg:mx-20 text-center`}
            src="../../../static/images/misabot.png"
          />
        </div>
        <div
          className={`${styles.heroContent} flex-1 text-center md:text-left lg:text-left lg:w-1/2 mx-5`}
        >
          <p className="italic text-lg md:text-xl lg:text-xl">
            Ateneo Management Information Systems Association
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold w-full lg:w-4/5">
            We build tomorrow through Business Technology
          </h2>
          {isServicesActive ? (
            <Link to="/services">
              <Button className="mt-6 mr-6" variant="secondary">
                Work with us!
              </Button>
            </Link>
          ) : null}
          {isEventsActive ? (
            <Link to="/events">
              <Button className="mt-6" variant="tertiary">
                Events
              </Button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Hero

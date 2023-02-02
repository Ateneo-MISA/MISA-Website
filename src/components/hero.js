import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

import * as styles from './hero.module.css'

const Hero = () => (
  <div className={`${styles.hero} font-abc`}>
    <div className={`flex flex-col md:flex-row lg:flex-row pt-20 lg:ml-20 pb-20 lg:pb-10`}>
      <div className='flex-initial justify-center'>
        <StaticImage
          className={`${styles.image} lg:mx-20`}
          src="../../static/images/b.png"
        />
      </div>
      <div className={`${styles.heroContent} flex-1 text-center md:text-left lg:text-left lg:w-1/2 mx-5`}>
        <p className="italic text-lg md:text-xl lg:text-xl">
          Ateneo Management Information Systems Association
        </p>
        <h2 className="text-4xl lg:text-5xl font-extrabold w-full lg:w-4/5">
          We build tomorrow through Business Technology
        </h2>
        <button
          className="bg-[#D9E8EC] text-[#2097A2] py-2.5 px-5 rounded-md mt-6 mr-6"
          type="button"
        >
          Work with us!
        </button>
        <button className="border-2 rounded-md py-2.5 px-5" type="button">
          Events
        </button>
      </div>
    </div>
  </div>
)

export default Hero

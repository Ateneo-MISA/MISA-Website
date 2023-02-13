import React from 'react'

import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'

import Button from '../components/Elements/button'

const AboutUs = () => {
  let dateToday = new Date().getFullYear()
  let currentMisaYear = dateToday - 1994

  return (
    <Layout>
      {/* first frame */}
      <div className="flex-none lg:flex pl-24 pt-24 bg-navbarBlack font-abc">
        <div className="mr-0 lg:mr-36 text-white w-full lg:w-1/2 pr-24 lg:pr-0 items-center text-center lg:text-left pb-28">
          <h1 className="text-5xl mb-6 font-extrabold">
            Who <span className="text-misaAlternateTeal">MISA</span> is
          </h1>
          <p className="text-xl mb-6 font-normal italic text-[#D9E8EC]">
            We are the{' '}
            <span className="text-misaAlternateTeal">
              Management Information Systems Association (MISA)
            </span>
            , the Ateneo Loyola Schools’ premier information management
            organization which serves as a home for MIS majors and like-minded
            IT enthusiasts.
          </p>
          <p className="text-xl mb-6 font-normal italic text-[#D9E8EC]">
            Founded in 1994, it is now on its {currentMisaYear}th year of
            pursuing its main advocacy –{' '}
            <span className="text-misaAlternateTeal">
              social transformation through information management.
            </span>
          </p>

          <Button variant="primary" className="items-center text-center mb-28">
            See Our Clusters
          </Button>

          <div className="block lg:hidden">
            <StaticImage
              className="w-4/6"
              src="../../static/images/misahexagons.png"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 mb-4 hidden lg:block text-right">
          <StaticImage
            className="w-4/6 text-right"
            src="../../static/images/misahexagons.png"
          />
        </div>
      </div>

      {/* second frame */}
      <div className="flex-none lg:flex py-24 px-20 font-abc">
        <div className="mr-20 w-full lg:w-1/2 sm:w-full text-center">
          <h1 className="text-5xl text-black font-extrabold">Vision</h1>
          <StaticImage
            width={240}
            height={190}
            src="../../static/images/misabinocular.png"
          />
          <p className="text-[#282828] italic">
            We aim to inform, form, and to transform the society through
            proactive engagement in projects utilizing information technology as
            a tool towards effective information management.
          </p>
        </div>
        <div className="w-full lg:w-1/2 mt-48 lg:mt-0 text-center items-center">
          <h1 className="text-5xl text-black font-extrabold">Mission</h1>
          <StaticImage
            width={240}
            height={190}
            src="../../static/images/misamountain.png"
          />
          <p className="text-[#282828] italic ">
            We aim to become the leading student-organization of information
            management professionals leveraging our skills on information
            technology for our pursuit of excellence and nation building.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default AboutUs

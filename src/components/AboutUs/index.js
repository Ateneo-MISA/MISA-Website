import React from 'react'

import Layout from '../Layout/index'
import { StaticImage } from 'gatsby-plugin-image'

const AboutUs = () => {
  let dateToday = new Date().getFullYear()
  let currentMisaYear = dateToday - 1994

  return (
    <Layout>
      {/* first frame */}
      <div className="flex-none lg:flex pl-24 pt-24 bg-navbarBlack font-abc">
        <div className="overflow-hidden lg:max-h-[551px] text-white w-full pr-24 lg:pr-0 items-center text-left pb-28 relative">
          <StaticImage
            className="absolute right-[-100px] bottom-[-100px] max-w-[275px] md:max-w-[320px] lg:max-w-[460px]"
            src="../../../static/images/misahexagons.png"
          />
          <div className="w-full lg:w-2/3">
            <h1 className="text-5xl mb-6 font-extrabold text-center lg:text-left">
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

            {/* uncomment when clusters are done */}
            {/* <Button
              variant="primary"
              className="items-center text-center mb-28"
            >
              See Our Clusters
            </Button> */}
          </div>
          {/* 
          <div className="block lg:hidden">
            <StaticImage
              className="w-4/6"
              src="../../../static/images/misahexagons.png"
            />
          </div> */}
        </div>
      </div>

      {/* second frame */}
      <div className="flex-none lg:flex py-24 px-20 font-abc">
        <div className="mr-20 w-full lg:w-1/2 sm:w-full text-center">
          <h1 className="text-5xl text-black font-extrabold mb-14">Vision</h1>
          <StaticImage
            className="w-1/2 lg:w-1/4 mb-5"
            quality={100}
            src="../../../static/images/misavision.png"
          />
          <p className="text-[#282828] italic text-xl">
            We aim to{' '}
            <span className="font-bold">inform, form, and to transform</span>{' '}
            the society through proactive engagement in projects utilizing
            information technology as a tool towards effective information
            management.
          </p>
        </div>
        <div className="w-full lg:w-1/2 mt-48 lg:mt-0 text-center items-center">
          <h1 className="text-5xl text-black font-extrabold mb-14">Mission</h1>
          <StaticImage
            className="w-full lg:w-1/2 mb-5"
            quality={100}
            src="../../../static/images/misamission.png"
          />
          <p className="text-[#282828] italic text-xl">
            We aim to become the{' '}
            <span className="font-bold">
              leading student-organization of information management
              professionals
            </span>{' '}
            leveraging our skills on information technology for our pursuit of
            excellence and nation building.
          </p>
        </div>
      </div>

      {/* core values frame */}
      <div className="text-center bg-[#D9E8EC] font-abc flex flex-col justify-center">
        <h1 className="text-5xl font-bold text-[#2097A2] pt-12">Core Values</h1>

        {/* hexagons */}
        <div className="flex justify-center pt-20 pb-80 md:pb-56">
          <div
            className=" hover:scale-[120%] hover:-translate-x-3 ease-in duration-300 group
          absolute mr-[90px] mt-[55px]
          flex bg-[#31ADAF] rounded-xl w-[100px] h-[63px] rotate-90
          before:absolute before:bg-[#31ADAF] before:rounded-xl before:w-[100px] before:h-[63px] before:rotate-[60deg] 
          after:absolute after:bg-[#31ADAF] after:rounded-xl after:w-[100px] after:h-[63px]  after:-rotate-[60deg]"
          >
            <p
              className="z-10 text-lg md:text-xl opacity-0 -rotate-90 absolute max-[769px]:left-[150px] max-[769px]:bottom-[56px] md:top-[160px] text-[#31ADAF] italic
             group-hover:opacity-100 group-hover:transition group-hover:ease-in group-hover:duration-700"
            >
              SERVANT LEADERSHIP
            </p>
          </div>

          <div
            className="hover:scale-[120%] hover:translate-y-2 hover:translate-x-2 ease-in duration-300 group
          ml-[95px] mt-[110px] absolute
          flex bg-[#31ADAF] rounded-xl w-[100px] h-[63px] rotate-90
          before:absolute before:bg-[#31ADAF] before:rounded-xl before:w-[100px] before:h-[63px] before:rotate-[60deg] 
          after:absolute after:bg-[#31ADAF] after:rounded-xl after:w-[100px] after:h-[63px]  after:-rotate-[60deg]"
          >
            <p
              className="z-10 text-lg md:text-xl opacity-0 -rotate-90 absolute max-[769px]:left-[110px] max-[769px]:top-[95px] md:bottom-[160px] text-[#31ADAF] italic w-[100px]
             group-hover:opacity-100 group-hover:transition group-hover:ease-in group-hover:duration-700"
            >
              PROFESSIONALISM
            </p>
          </div>

          <div
            className=" hover:scale-[120%] hover:translate-x-2 hover:-translate-y-2 ease-in duration-300 group
          absolute ml-[100px]
          flex bg-[#31ADAF] rounded-xl w-[100px] h-[63px] rotate-90
          before:absolute before:bg-[#31ADAF] before:rounded-xl before:w-[100px] before:h-[63px] before:rotate-[60deg] 
          after:absolute after:bg-[#31ADAF] after:rounded-xl after:w-[100px] after:h-[63px]  after:-rotate-[60deg]"
          >
            <p
              className="z-10 text-lg md:text-xl opacity-0 -rotate-90 absolute max-[769px]:left-[200px] max-[769px]:top-[60px] md:bottom-[160px] md:right-[0px] text-[#31ADAF] italic
             group-hover:opacity-100 group-hover:transition group-hover:ease-in group-hover:duration-700"
            >
              EXCELLENCE
            </p>
          </div>
        </div>

        <div className="flex justify-center py-10">
          <p className="w-2/3 text-center text-xl">
            We provide a fun learning environment for our members to help them{' '}
            <span className="font-bold text-misaTeal">
              fully realize their potential as individuals and as catalysts of
              change
            </span>{' '}
            through information management and information technology.
          </p>
        </div>
      </div>

      <style></style>
    </Layout>
  )
}

export default AboutUs

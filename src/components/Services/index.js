import React from 'react'

import Layout from '../Layout'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import Button from '../Elements/Button'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

import useContentfulServicesProjects from './hooks/useContentfulServicesProjects'

const EServices = () => {
  const projects = useContentfulServicesProjects()
  console.log('PROJECTS', projects)

  const services = [
    {
      title: 'Web Development',
      description:
        'We can help you build your online presence by putting your best foot forward.',
      svg: (
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-misaTeal group-hover:fill-white transition duration-300"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM14.8055 18.4151C17.1228 17.4003 18.7847 15.1667 18.9806 12.525C18.1577 12.9738 17.12 13.3418 15.9371 13.598C15.7882 15.4676 15.3827 17.1371 14.8055 18.4151ZM9.1945 5.58487C7.24725 6.43766 5.76275 8.15106 5.22208 10.244C5.4537 10.4638 5.84813 10.7341 6.44832 11.0008C6.89715 11.2003 7.42053 11.3798 8.00537 11.5297C8.05853 9.20582 8.50349 7.11489 9.1945 5.58487ZM10.1006 13.9108C10.2573 15.3675 10.5852 16.6202 10.9992 17.5517C11.2932 18.2133 11.5916 18.6248 11.8218 18.8439C11.9037 18.9219 11.9629 18.9634 12 18.9848C12.0371 18.9634 12.0963 18.9219 12.1782 18.8439C12.4084 18.6248 12.7068 18.2133 13.0008 17.5517C13.4148 16.6202 13.7427 15.3675 13.8994 13.9108C13.2871 13.9692 12.6516 14 12 14C11.3484 14 10.7129 13.9692 10.1006 13.9108ZM8.06286 13.598C8.21176 15.4676 8.61729 17.1371 9.1945 18.4151C6.8772 17.4003 5.21525 15.1666 5.01939 12.525C5.84231 12.9738 6.88001 13.3418 8.06286 13.598ZM13.9997 11.8896C13.369 11.9609 12.6993 12 12 12C11.3008 12 10.631 11.9609 10.0003 11.8896C10.0135 9.66408 10.4229 7.74504 10.9992 6.44832C11.2932 5.78673 11.5916 5.37516 11.8218 5.15605C11.9037 5.07812 11.9629 5.03659 12 5.01516C12.0371 5.03659 12.0963 5.07812 12.1782 5.15605C12.4084 5.37516 12.7068 5.78673 13.0008 6.44832C13.5771 7.74504 13.9865 9.66408 13.9997 11.8896ZM15.9946 11.5297C15.9415 9.20582 15.4965 7.11489 14.8055 5.58487C16.7528 6.43766 18.2373 8.15107 18.7779 10.244C18.5463 10.4638 18.1519 10.7341 17.5517 11.0008C17.1029 11.2003 16.5795 11.3798 15.9946 11.5297Z"
          />
        </svg>
      ),
    },
    {
      title: 'IT Consultancy',
      description:
        'We can improve your organization by leveraging IT to your advantage.',
      svg: (
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-misaTeal group-hover:fill-white transition duration-300"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
          />
          <path d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z" />
        </svg>
      ),
    },
    {
      title: 'Systems Development',
      description:
        'We believe in the efficiency and effectiveness of processes to maximize your business potential.',
      svg: (
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-misaTeal group-hover:fill-white transition duration-300"
        >
          <path d="M5 9V7H7V9H5Z" />
          <path d="M9 9H19V7H9V9Z" />
          <path d="M5 15V17H7V15H5Z" />
          <path d="M19 17H9V15H19V17Z" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1 6C1 4.34315 2.34315 3 4 3H20C21.6569 3 23 4.34315 23 6V18C23 19.6569 21.6569 21 20 21H4C2.34315 21 1 19.6569 1 18V6ZM4 5H20C20.5523 5 21 5.44772 21 6V11H3V6C3 5.44772 3.44772 5 4 5ZM3 13V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V13H3Z"
          />
        </svg>
      ),
    },
  ]

  return (
    <Layout>
      {/* first frame */}
      <div className="flex-col lg:flex px-6 md:px-12 lg:px-24 pb-64 py-8 lg:py-12 xl:py-24 bg-navbarBlack font-abc relative overflow-hidden">
        <div className="mr-0 lg:mr-36 text-white w-full lg:w-1/2 items-center text-center lg:text-left">
          <h1 className="text-5xl mb-6 font-extrabold">eServices</h1>
          <p className="text-xl my-6 font-extralight italic text-[#D9E8EC]">
            eServices is a cluster under MISA that provides IT solutions to
            clients within and outside the organization. In line with MISA's
            vision of social transformation through information management, it
            aims to improve organizational processes of clients by delivering
            quality IT Solutions through the effective use of information
            technology.
          </p>
          <a
            href="https://drive.google.com/file/d/1j21-SU6HoJvvSwSKGT9ULN-uWxyE4wOX/view"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant={'primary'}>Download Catalogue</Button>
          </a>
        </div>
        <StaticImage
          className={`max-w-md lg:max-w-2xl xl:max-w-3xl absolute -bottom-52 lg:-bottom-60 -right-24 lg:-right-48`}
          src="../../static/images/eservices-hexagons.png"
        />
      </div>

      {/* second frame */}

      <div className="py-20 px-10 md:px-20">
        <div className="relative">
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            speed={200}
            spaceBetween={50}
            slidesPerView="1"
            loop
            pagination={{
              el: '.swiper-pagination-eservs-projects',
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
          >
            {projects.map((project, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="pb-4 italic">
                    <Link to={project.link} className="hover:underline">
                      {project.title}
                    </Link>
                  </div>
                  <Link
                    to={project.link}
                    className="relative hover:brightness-75 duration-300 transition"
                  >
                    <img
                      className="w-full rounded-xl object-cover h-[40rem]"
                      alt=""
                      src={project.image.file.url}
                    />
                  </Link>
                </SwiperSlide>
              )
            })}
          </Swiper>
          <div className="swiper-pagination-eservs-projects max-w-max md:!absolute !top-0 !left-auto !right-0 z-20" />
        </div>
      </div>

      {/* third frame */}

      <div className="flex flex-col items-center justify-center py-24 pt-12 px-10 md:px-20 font-abc gap-8">
        <h2 className="font-bold text-4xl text-center">Our Services</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const { title, description, svg } = service
            return (
              <div
                className="border-4 border-misaTeal rounded-3xl p-12 text-center flex flex-col items-center gap-4 group hover:bg-misaTeal transition duration-300 hover:text-white"
                key={index}
              >
                {svg}
                <h3 className="text-misaTeal font-bold text-2xl group-hover:text-white transition duration-300">
                  {title}
                </h3>
                <p className="font-light">{description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default EServices

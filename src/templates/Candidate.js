import React from 'react'
import { Link } from 'gatsby'
import { StaticImage, GatsbyImage } from 'gatsby-plugin-image'

import Layout from '../components/Layout/index'

import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { BLOCKS } from '@contentful/rich-text-types'

export default function CandidateTemplate({ pageContext }) {
  const { candidate } = pageContext
  const { name, position, vision, image, platforms } = candidate
  const options = {
    renderNode: {
      [BLOCKS.UL_LIST]: (node, children) => {
        return <ul className="list-disc ml-4">{children}</ul>
      },
      [BLOCKS.OL_LIST]: (node, children) => {
        return <ol className="list-decimal ml-4">{children}</ol>
      },
    },
  }
  return (
    <Layout>
      <div className="bg-misaTeal h-[60vh] grid grid-cols-[1fr_2fr] relative px-16 overflow-hidden relative">
        <Link to="/elections" className="absolute left-4 top-12 text-white">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.02698 11.9929L5.26242 16.2426L6.67902 14.8308L4.85766 13.0033L22.9731 13.0012L22.9728 11.0012L4.85309 11.0033L6.6886 9.17398L5.27677 7.75739L1.02698 11.9929Z"
              fill="currentColor"
            />
          </svg>
        </Link>
        <div className="bg-gray-400 relative">
          <GatsbyImage
            className={`text-center h-full w-full object-cover`}
            image={image.gatsbyImage}
          />
        </div>
        <div className="flex flex-col justify-end gap-8 p-16 text-white">
          <div>
            <span className="italic font-thin">{position} candidate</span>
            <h3 className="font-bold text-5xl">{name}</h3>
          </div>
          <div>
            <span className="uppercase font-bold text-2xl">Vision</span>
            <p>{vision.vision}</p>
          </div>
        </div>
        <StaticImage
          quality={100}
          className={`max-w-[320px] absolute -top-14 -right-8 rotate-180`}
          src="../../../static/images/eventshexagons.png"
        />
      </div>
      <div className="bg-white p-16">
        <h2 className="text-misaTeal text-5xl font-extrabold">Platforms</h2>
        <div className="py-8 grid gap-4">
          {renderRichText(platforms, options)}
        </div>
      </div>
      {/* <p>{platform}</p> */}
    </Layout>
  )
}

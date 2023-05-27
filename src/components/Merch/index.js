import React from 'react'
import { useState, useContext } from 'react'
import { Link } from 'gatsby'

import Layout from '../Layout/index'
import { StaticImage } from 'gatsby-plugin-image'

import FilterBar from '../Elements/FilterBar'
import FAQDrawer from './FAQDrawer'

import useContentfulMerch from './hooks/useContentfulMerch'
import useContentfulMerchFAQ from './hooks/useContentfulMerchFAQ'
import { MerchContext } from './MerchContext'

const Merch = () => {
  const { cart } = useContext(MerchContext)
  const [selected, setSelected] = useState('A-Z')
  let allMerch = useContentfulMerch()

  if (selected === 'A-Z') {
    allMerch.sort((a, b) => a.name.localeCompare(b.name))
  } else if (selected === 'Z-A') {
    allMerch.sort((a, b) => b.name.localeCompare(a.name))
  } else if (selected === '$$$ → $') {
    allMerch.sort((a, b) => a?.price - b?.price)
  } else if (selected === '$ → $$$') {
    allMerch.sort((a, b) => b?.price - a?.price)
  }

  let allMerchFAQ = useContentfulMerchFAQ()

  const options = ['A-Z', 'Z-A', '$$$ → $', '$ → $$$']
  return (
    <Layout>
      <StaticImage
        src="../../../static/images/merchHero.png"
        className="w-full"
      />
      <div className="m-14">
        <div className="lg:flex justify-between">
          <div className="lg:flex">
            <h1 className="text-5xl font-extrabold">MISA Merch 2023: Wave 3</h1>
            <div className="lg:flex border-2 border-solid border-[#31ADAF] py-2 px-5 rounded-lg lg:ml-10 lg:text-left text-center lg:my-0 my-8">
              <StaticImage
                className="w-[30px] h-[30px] lg:mr-2"
                src="../../../static/images/merchHourglass.png"
              />
              <p className="text-xl text-[#31ADAF]">
                UNTIL MAY 15, 2023 11:59PM
              </p>
            </div>
          </div>

          <div className="flex">
            <a href="#FAQ">
              <StaticImage
                className="w-[50px] h-[50px] mr-9 cursor-pointer"
                src="../../../static/images/merchFAQ.png"
              />
            </a>

            <Link className="relative" to="/merch/cart">
              <StaticImage
                className="w-[50px] h-[50px] cursor-pointer"
                src="../../../static/images/merchCart.png"
              />
              <div class="absolute right-0 top-0 w-[21px] h-[21px] bg-[#31ADAF] rounded-full flex items-center justify-center">
                <p class="text-white text-center ">{cart?.length}</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="mt-9 flex">
          <p className="my-4 mr-3">Sort By</p>
          <FilterBar
            options={options}
            setSelected={setSelected}
            selected={selected}
          />
        </div>
        <div className="mt-9">
          <div className="mb-16 flex flex-wrap gap-16 justify-center">
            {allMerch.map((merch) => {
              const slug = merch?.name
                .replace(/([a-z])([A-Z])/g, '$1-$2')
                .replace(/[\s_]+/g, '-')
                .toLowerCase()

              return (
                <Link to={`/merch/${slug}`}>
                  <div>
                    <img
                      className="h-[400px] w-[400px]"
                      src={merch?.photo?.file?.url}
                    />
                    <div className="h-[125px] w-[400px] text-center pt-8 px-14 border-r-2 border-b-2 border-l-2 rounded-b-md border-[#D9E8EC]">
                      <p className="text-2xl font-extrabold">{merch?.name}</p>
                      <p className="text-2xl font-extrabold text-[#31ADAF]">
                        ₱{merch?.price}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
          <hr />
        </div>

        <div className="mt-9" id="FAQ">
          <div className="flex mb-5">
            <StaticImage
              className="w-[50px] h-[50px] mr-5"
              src="../../../static/images/merchFAQ.png"
            />
            <h1 className="text-5xl font-extrabold">MISA Merch FAQs</h1>
          </div>
          {allMerchFAQ.map((FAQ) => {
            return <FAQDrawer faq={FAQ} />
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Merch

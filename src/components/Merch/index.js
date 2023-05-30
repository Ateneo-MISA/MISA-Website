import React from 'react'
import moment from 'moment'
import { useState, useContext } from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShoppingCart,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons'

import Layout from '../Layout/index'
import { StaticImage } from 'gatsby-plugin-image'

import FilterBar from '../Elements/FilterBar'
import FAQDrawer from './FAQDrawer'

import useContentfulMerch from './hooks/useContentfulMerch'
import useContentfulMerchFAQ from './hooks/useContentfulMerchFAQ'
import useContentfulDynamicContent from '../../hooks/useContentfulDynamicContent'
import { MerchContext } from './MerchContext'

const Merch = () => {
  const dynamicContent = useContentfulDynamicContent()?.filter((content) => {
    return content?.name === 'MISA Merch Details'
  })[0]

  const { cart } = useContext(MerchContext)
  const [selected, setSelected] = useState('A-Z')
  let allMerch = useContentfulMerch()

  if (selected === 'A-Z') {
    allMerch.sort((a, b) => a.name.localeCompare(b.name))
  } else if (selected === 'Z-A') {
    allMerch.sort((a, b) => b.name.localeCompare(a.name))
  } else if (selected === '$$$ → $') {
    allMerch.sort((a, b) => b?.price - a?.price)
  } else if (selected === '$ → $$$') {
    allMerch.sort((a, b) => a?.price - b?.price)
  }

  let allMerchFAQ = useContentfulMerchFAQ()

  const options = ['A-Z', 'Z-A', '$$$ → $', '$ → $$$']
  return (
    <Layout>
      <img
        src={dynamicContent?.image?.file?.url}
        alt="merchHero"
        className="w-full"
      />
      <div className="m-14">
        <div className="xl:flex justify-between">
          <div className="xl:flex">
            <h1 className="text-5xl font-extrabold">
              <span className="text-[#31ADAF]">MISA Merch</span>{' '}
              {dynamicContent?.content?.content}
            </h1>
            <div className="xl:flex border-2 border-solid border-[#31ADAF] py-2 px-5 rounded-lg xl:ml-10 xl:text-left text-center xl:my-0 my-8">
              <StaticImage
                className="w-[30px] h-[30px] xl:mr-2"
                src="../../../static/images/merchHourglass.png"
              />
              <p className="text-xl text-[#31ADAF]">
                UNTIL{' '}
                {moment(dynamicContent?.date)
                  .format('MMMM DD, YYYY h:mm a')
                  .toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex">
            <a href="#FAQ">
              <FontAwesomeIcon
                className="w-[50px] h-[50px] mr-9 cursor-pointer text-[#2097A2] hover:text-[#31ADAF] ease-in duration-150"
                icon={faCircleQuestion}
              />
            </a>

            <Link
              className="relative text-[#2097A2] hover:text-[#31ADAF] ease-in duration-150 group"
              to="/merch/cart"
            >
              <FontAwesomeIcon
                className="w-[50px] h-[50px] cursor-pointer"
                icon={faShoppingCart}
              />
              <div class="absolute right-0 top-0 w-[21px] h-[21px] bg-[#2097A2] group-hover:bg-[#31ADAF] rounded-full flex items-center justify-center">
                <p class="text-white text-center ">{cart?.length}</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="mt-9 flex">
          <p className="my-4 mr-3 mt-6">Sort By</p>
          <FilterBar
            options={options}
            setSelected={setSelected}
            selected={selected}
          />
        </div>
        <div className="mt-9 border-b-2 border-[#D9E8EC]">
          <div className="mb-16 flex flex-wrap gap-12 justify-center">
            {allMerch.map((merch) => {
              const slug = merch?.name
                .replace(/([a-z])([A-Z])/g, '$1-$2')
                .replace(/[\s_]+/g, '-')
                .toLowerCase()

              return (
                <Link to={`/merch/${slug}`}>
                  <div>
                    <img
                      alt="merchPhoto"
                      className="sm:h-[400px] sm:w-[400px] border-r-2 border-b-2 border-l-2 border-t-2 rounded-tr-md rounded-tl-md border-[#D9E8EC]"
                      src={merch?.photo?.file?.url}
                    />
                    <div className="sm:h-[125px] sm:w-[400px] text-center py-8 px-14 border-r-2 border-b-2 border-l-2 rounded-b-md border-[#D9E8EC]">
                      <p className="text-2xl font-extrabold">{merch?.name}</p>
                      <p className="text-2xl font-extrabold text-[#31ADAF]">
                        ₱{parseFloat(merch?.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mt-9" id="FAQ">
          <div className="flex mb-5">
            <FontAwesomeIcon
              className="w-[50px] h-[50px] mr-5 text-[#2097A2] hover:text-[#31ADAF] ease-in duration-150"
              icon={faCircleQuestion}
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

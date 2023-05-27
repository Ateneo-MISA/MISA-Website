import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Link, navigate } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import Layout from '../components/Layout/index'
import Button from '../components/Elements/Button'

import useContentfulMerch from '../components/Merch/hooks/useContentfulMerch'

import { MerchContext } from '../components/Merch/MerchContext'

const IndividualProduct = ({ pageContext }) => {
  const { cart, addToCart } = useContext(MerchContext)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [quantity, setQuantity] = useState(0)

  let allMerch = useContentfulMerch()?.filter((product) => {
    return product?.name !== pageContext?.product?.name
  })

  let allMerchCopy = allMerch.slice()
  let randomMerch = []

  while (randomMerch.length < 3 && allMerchCopy.length > 0) {
    var randomIndex = Math.floor(Math.random() * allMerchCopy.length)
    var randomElement = allMerchCopy.splice(randomIndex, 1)[0]
    randomMerch.push(randomElement)
  }

  let numberOfCurrentItemInCart = 0
  for (let i = 0; i < cart.length; i++) {
    if (pageContext?.product?.name === cart[i]?.name) {
      numberOfCurrentItemInCart += 1
    }
  }

  return (
    <Layout>
      <div className="m-16">
        <div className="flex justify-between">
          <Link to="/merch">
            <div className="flex">
              <StaticImage
                className="w-[30px] h-[30px] mr-4"
                src="../../static/images/merchBack.png"
              />
              <p className="text-[#31ADAF] text-lg">Back to merch</p>
            </div>
          </Link>

          <Link className="relative" to="/merch/cart">
            <StaticImage
              className="w-[50px] h-[50px]"
              src="../../static/images/merchCart.png"
            />

            <div class="absolute right-0 top-0 w-[21px] h-[21px] bg-[#31ADAF] rounded-full flex items-center justify-center">
              <p class="text-white text-center ">{numberOfCurrentItemInCart}</p>
            </div>
          </Link>
        </div>

        <div className="mt-5 lg:flex gap-7">
          <img
            className="lg:h-[600px] lg:w-[600px]"
            src={pageContext?.product?.photo?.file?.url}
          />
          <div>
            <p className="text-5xl font-extrabold mt-9 lg:mt-0">
              {pageContext?.product?.name}
            </p>
            <p className="mt-2 text-3xl font-extrabold text-[#31ADAF]">
              ₱{pageContext?.product?.price}
            </p>
            <p className="mt-6 grid gap-4">
              {renderRichText(pageContext?.product?.description)}
            </p>

            {pageContext?.product?.categoryName ? (
              <div className="mt-6">
                <p className="text-xl font-medium mb-3">
                  {pageContext?.product?.categoryName}
                </p>
                <div className="flex flex-wrap gap-3">
                  {pageContext?.product?.categories?.map((category) => {
                    return (
                      <div
                        className={`${
                          selectedCategory === category?.name
                            ? 'text-xl font-medium py-2 px-12 text-white border-2 border-md border-[#2097A2] bg-[#2097A2] rounded-md ease-in duration-150'
                            : 'text-xl font-medium py-2 px-12 text-[#31ADAF] border-2 rounded-md border-[#31ADAF] hover:bg-[#31ADAF] hover:text-white ease-in duration-150 cursor-pointer'
                        }`}
                        onClick={() => setSelectedCategory(category?.name)}
                      >
                        {category?.name}
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : null}

            <div className="mt-6">
              <p className="text-xl font-medium mb-3">Quantity</p>
              <div className="text-xl font-medium py-2 text-[#31ADAF] border-2 rounded-md border-[#31ADAF] w-[200px] flex justify-around">
                <p
                  className="cursor-pointer"
                  onClick={() =>
                    quantity > 0 ? setQuantity(quantity - 1) : null
                  }
                >
                  -
                </p>
                <p>{quantity}</p>
                <p
                  className="cursor-pointer"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </p>
              </div>
            </div>

            <Button
              onClick={() =>
                addToCart(quantity, pageContext?.product, selectedCategory)
              }
              disabled={
                quantity <= 0
                  ? true
                  : pageContext?.product?.categoryName
                  ? selectedCategory
                    ? false
                    : true
                  : false
              }
              variant="primary"
              className="w-full mt-6"
            >
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="mt-16">
          <p className="text-4xl font-extrabold mb-7">
            You may also like{' '}
            <span className="text-[#31ADAF]">MISABot's faves!</span>
          </p>

          <div className="mb-16 flex flex-wrap gap-16 justify-center">
            {randomMerch.map((merch) => {
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
        </div>
      </div>
    </Layout>
  )
}

export default IndividualProduct

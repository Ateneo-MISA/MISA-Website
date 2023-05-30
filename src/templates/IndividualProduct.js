import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { useState, useContext, useEffect } from 'react'
import { Link } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShoppingCart,
  faArrowLeftLong,
} from '@fortawesome/free-solid-svg-icons'

import Layout from '../components/Layout/index'
import Button from '../components/Elements/Button'

import useContentfulMerch from '../components/Merch/hooks/useContentfulMerch'
import { MerchContext } from '../components/Merch/MerchContext'

const IndividualProduct = ({ pageContext }) => {
  const { cart, addToCart } = useContext(MerchContext)
  const [bundleItems, setBundleItems] = useState(
    pageContext?.product?.defaultBundleItems
  )
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [quantity, setQuantity] = useState(0)
  const [randomMerch, setRandomMerch] = useState([])

  let allMerch = useContentfulMerch()?.filter((product) => {
    return product?.name !== pageContext?.product?.name
  })

  useEffect(() => {
    if (randomMerch.length === 0) {
      let allMerchCopy = allMerch.slice()
      let threeRandomProducts = []

      while (threeRandomProducts.length < 3 && allMerchCopy.length > 0) {
        var randomIndex = Math.floor(Math.random() * allMerchCopy.length)
        var randomElement = allMerchCopy.splice(randomIndex, 1)[0]
        threeRandomProducts.push(randomElement)
      }

      setRandomMerch(threeRandomProducts)
    }
  }, [randomMerch.length, allMerch])

  let numberOfCurrentItemInCart = 0
  for (let i = 0; i < cart.length; i++) {
    if (cart[i]?.name === pageContext?.product?.name) {
      numberOfCurrentItemInCart += 1
    }
  }

  const setBundleItemCategory = (categoryName, index) => {
    for (let i = 0; i < bundleItems.length; i++) {
      if (i === index) {
        let updatedBundleItem = bundleItems[i]
        updatedBundleItem.selectedCategory = categoryName

        let updatedBundleItems = bundleItems.map((bundleItem) => {
          if (updatedBundleItem?.name === bundleItem?.name)
            return updatedBundleItem
          return bundleItem
        })

        setBundleItems(updatedBundleItems)
        break
      }
    }
  }

  const addChoiceToBundleItems = (option, choiceName) => {
    let currentChoiceAlreadyMade = false
    let currentIndexOfChoice
    for (let i = 0; i < bundleItems.length; i++) {
      if (bundleItems[i]?.choiceName === choiceName) {
        currentChoiceAlreadyMade = true
        currentIndexOfChoice = i
        break
      }
    }

    if (currentChoiceAlreadyMade) {
      let updatedBundleItems = bundleItems.filter((bundleItem, index) => {
        return index !== currentIndexOfChoice
      })

      updatedBundleItems.push({
        ...option,
        choiceName: choiceName,
      })
      setBundleItems(updatedBundleItems)
    } else {
      let finalChoiceItem = {
        ...option,
        choiceName: choiceName,
      }
      setBundleItems([...bundleItems, finalChoiceItem])
    }
  }

  const checkIfAddToCartButtonShouldBeDisabled = () => {
    if (pageContext?.product?.bundle) {
      if (quantity <= 0) {
        return true
      } else {
        if (bundleItems.length !== pageContext?.product?.numberOfBundleItems) {
          return true
        } else {
          for (let i = 0; i < bundleItems.length; i++) {
            if (
              bundleItems[i]?.categoryName &&
              !bundleItems[i]?.selectedCategory
            ) {
              return true
            }
          }
          return false
        }
      }
    } else {
      if (quantity <= 0) {
        return true
      } else {
        if (pageContext?.product?.categoryName && !selectedCategory) {
          return true
        } else {
          return false
        }
      }
    }
  }

  return (
    <Layout>
      <div className="m-16">
        <div className="flex justify-between">
          <Link
            to="/merch"
            className="group text-[#2097A2] hover:text-[#31ADAF] ease-in duration-150"
          >
            <div className="flex">
              <FontAwesomeIcon
                className="w-[30px] h-[30px] mr-4"
                icon={faArrowLeftLong}
              />
              <p className="text-lg">Back to merch</p>
            </div>
          </Link>

          <Link
            className="relative text-[#2097A2] hover:text-[#31ADAF] ease-in duration-150 group"
            to="/merch/cart"
          >
            <FontAwesomeIcon
              className="w-[50px] h-[50px] cursor-pointer"
              icon={faShoppingCart}
            />
            <div class="absolute right-0 top-0 w-[21px] h-[21px] bg-[#2097A2] group-hover:bg-[#31ADAF] rounded-full flex items-center justify-center">
              <p class="text-white text-center ">{numberOfCurrentItemInCart}</p>
            </div>
          </Link>
        </div>

        <div className="mt-5 lg:flex gap-7">
          <img
            alt="merchPhoto"
            className="lg:h-[600px] lg:w-[600px]"
            src={pageContext?.product?.photo?.file?.url}
          />
          <div>
            <p className="text-5xl font-extrabold mt-9 lg:mt-0">
              {pageContext?.product?.name}
            </p>
            <p className="mt-2 text-3xl font-extrabold text-[#31ADAF]">
              ₱{parseFloat(pageContext?.product?.price).toFixed(2)}
            </p>
            <p className="mt-6 grid gap-4">
              {renderRichText(pageContext?.product?.description)}
            </p>

            {pageContext?.product?.bundleChoices ? (
              <div>
                {pageContext?.product?.bundleChoices.map((bundleChoice) => {
                  return (
                    <div>
                      <p className="text-xl font-medium mb-3 mt-5">
                        {bundleChoice?.name} Choice
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {bundleChoice?.choices.map((option) => {
                          return (
                            <button
                              className={`${
                                bundleItems.filter((bundleItem) => {
                                  return bundleItem?.name === option?.name
                                })[0]?.name === option?.name
                                  ? 'text-xl font-medium py-2 px-12 text-white border-2 border-md border-[#2097A2] bg-[#2097A2] rounded-md ease-in duration-150'
                                  : 'text-xl font-medium py-2 px-12 text-[#31ADAF] border-2 rounded-md border-[#31ADAF] hover:bg-[#31ADAF] hover:text-white ease-in duration-150 cursor-pointer'
                              }`}
                              onClick={() =>
                                addChoiceToBundleItems(
                                  option,
                                  bundleChoice?.name
                                )
                              }
                            >
                              {option?.name}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : null}

            {pageContext?.product?.bundle ? (
              <div className="mt-5">
                {bundleItems.map((defaultBundleItem, index) => {
                  if (defaultBundleItem?.categoryName) {
                    return (
                      <div className="mt-5">
                        <p className="text-xl font-medium mb-3 mt-5">
                          {defaultBundleItem?.categoryName} for{' '}
                          {defaultBundleItem?.name}
                        </p>

                        <div className="flex flex-wrap gap-3">
                          {defaultBundleItem?.categories.map((category) => {
                            return (
                              <button
                                className={`${
                                  defaultBundleItem?.selectedCategory ===
                                  category?.name
                                    ? 'text-xl font-medium py-2 px-12 text-white border-2 border-md border-[#2097A2] bg-[#2097A2] rounded-md ease-in duration-150'
                                    : 'text-xl font-medium py-2 px-12 text-[#31ADAF] border-2 rounded-md border-[#31ADAF] hover:bg-[#31ADAF] hover:text-white ease-in duration-150 cursor-pointer'
                                }`}
                                onClick={() =>
                                  setBundleItemCategory(category?.name, index)
                                }
                              >
                                {category?.name}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            ) : null}

            {pageContext?.product?.categoryName ? (
              <div className="mt-6">
                <p className="text-xl font-medium mb-3">
                  {pageContext?.product?.categoryName}
                </p>
                <div className="flex flex-wrap gap-3">
                  {pageContext?.product?.categories?.map((category) => {
                    return (
                      <button
                        className={`${
                          selectedCategory === category?.name
                            ? 'text-xl font-medium py-2 px-12 text-white border-2 border-md border-[#2097A2] bg-[#2097A2] rounded-md ease-in duration-150'
                            : 'text-xl font-medium py-2 px-12 text-[#31ADAF] border-2 rounded-md border-[#31ADAF] hover:bg-[#31ADAF] hover:text-white ease-in duration-150 cursor-pointer'
                        }`}
                        onClick={() => setSelectedCategory(category?.name)}
                      >
                        {category?.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : null}

            <div className="mt-6">
              <p className="text-xl font-medium mb-3">Quantity</p>
              <div className="text-xl font-medium py-2 text-[#31ADAF] border-2 rounded-md border-[#31ADAF] w-[200px] flex justify-around">
                <button
                  className="cursor-pointer"
                  onClick={() =>
                    quantity > 0 ? setQuantity(quantity - 1) : null
                  }
                >
                  -
                </button>
                <p>{quantity}</p>
                <button
                  className="cursor-pointer"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <Button
              disabled={checkIfAddToCartButtonShouldBeDisabled()}
              onClick={() =>
                addToCart(
                  quantity,
                  pageContext?.product,
                  selectedCategory,
                  pageContext?.product?.bundle,
                  bundleItems
                )
              }
              variant="primary"
              className="w-full mt-6"
            >
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="mt-16 relative">
          <StaticImage
            className="max-w-[150px] absolute left-[-125px] top-[-100px]"
            src="../../../../static/images/merchMISABot.png"
          />
          <p className="text-4xl font-extrabold mb-7">
            You may also like{' '}
            <span className="text-[#31ADAF]">MISABot's faves!</span>
          </p>

          <div className="mb-16 flex flex-wrap gap-12 justify-center">
            {randomMerch.map((merch) => {
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
      </div>
    </Layout>
  )
}

export default IndividualProduct

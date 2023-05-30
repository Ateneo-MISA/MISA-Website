import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import Layout from '../../Layout/index'
import Button from '../../Elements/Button'

import useContentfulMerch from '../hooks/useContentfulMerch'
import { MerchContext } from '../MerchContext'

const Complete = () => {
  const { orderNumber } = useContext(MerchContext)
  const [randomMerch, setRandomMerch] = useState([])

  let allMerch = useContentfulMerch()

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
  }, [allMerch, randomMerch.length])

  return (
    <Layout>
      <div>
        <div className="my-12 flex flex-col lg:flex-row justify-center mx-12 lg:mx-6 text-center lg:text-left">
          <div className="flex justify-center items-center mr-4">
            <StaticImage
              className="max-w-[250px] max-h-[250px]"
              src="../../../../static/images/misabot.png"
            />
          </div>
          <div>
            <div className="flex mt-5 lg:mt-0">
              <FontAwesomeIcon
                className="w-[50px] h-[50px] mr-4 text-[#2097A2]"
                icon={faCheckCircle}
              />
              <p className="text-3xl lg:text-5xl font-extrabold text-[#2097A2]">
                Thank you for purchasing!
              </p>
            </div>

            <div className="mt-5">
              <p className="text-2xl font-extrabold">
                Your Order Number: {orderNumber || 'N/A'}
              </p>
              <p className="mt-5">
                Your order's details has been sent to your email.
              </p>
              <p className="mt-5">
                Please pay within the week of your purchase by clicking on the
                Proceed to Payment or you may also access this through your
                email.
              </p>
              <p className="mt-5">
                If you have any concerns with your order, please refer to the{' '}
                <span className="text-[#2097A2] underline">
                  <a href="/merch#FAQ">FAQs</a>
                </span>
                .
              </p>
              <div className="mt-5 flex gap-9 justify-center lg:justify-start">
                <Link to="/merch">
                  <Button variant="tertiary">Back to Merch</Button>
                </Link>

                <Link to="/merch/payment">
                  <Button variant="primary">Proceed to Payment</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 relative">
          <StaticImage
            className="max-w-[150px] absolute left-[-70px] top-[-100px]"
            src="../../../../static/images/merchMISABot.png"
          />
          <p className="text-4xl font-extrabold mb-7 ml-12">
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
                      alt="merch"
                      className="h-[400px] w-[400px] border-r-2 border-b-2 border-l-2 border-t-2 rounded-tr-md rounded-tl-md border-[#D9E8EC]"
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

export default Complete

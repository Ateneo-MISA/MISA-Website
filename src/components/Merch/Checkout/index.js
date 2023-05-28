import { StaticImage } from 'gatsby-plugin-image'
import React, { useState, useContext, useEffect } from 'react'
import { Link, navigate } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

import Layout from '../../../components/Layout/index'
import Button from '../../Elements/Button'

import { MerchContext } from '../MerchContext'
import { getRecords, createRecord } from '../../../services/airtable'

const Checkout = () => {
  const [loading, setLoading] = useState(false)
  const [productsData, setProductsData] = useState(null)
  const getData = async () => {
    let orders = await getRecords({
      base: 'merchBase',
      tableName: 'Orders',
    })

    let products = await getRecords({
      base: 'merchBase',
      tableName: 'products',
    })

    setProductsData(products)
    return orders
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getData()
  }, [])

  const [modeOfDelivery, setModeOfDelivery] = useState(null)
  const [fullName, setFullName] = useState(null)
  const [email, setEmail] = useState(null)
  const [contactNumber, setContactNumber] = useState(null)
  const [facebookLink, setFacebookLink] = useState(null)
  const [fullAddress, setFullAddress] = useState(null)
  const [withinMetroManila, setWithinMetroManila] = useState(false)
  const [firstAcknowledgment, setFirstAcknowledgment] = useState(false)
  const [secondAcknowledgment, setSecondAcknowledgment] = useState(false)
  const { cart, emptyCart, setOrderNumber } = useContext(MerchContext)

  const timestamp = Date.now().toString()
  const randomNumber = Math.floor(Math.random() * 10000)
  const orderNumber = timestamp + randomNumber.toString().padStart(4, '0')

  let subTotal = 0
  for (let i = 0; i < cart.length; i++) {
    subTotal += cart[i]?.totalPrice
  }

  let total = 0
  total =
    subTotal + (modeOfDelivery === 'ship' ? (withinMetroManila ? 54 : 64) : 0)

  const handleFullNameChange = (event) => {
    setFullName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleContactNumberChange = (event) => {
    setContactNumber(event.target.value)
  }

  const handleFacebookLinkChange = (event) => {
    setFacebookLink(event.target.value)
  }

  const handleFullAddressChange = (event) => {
    setFullAddress(event.target.value)
  }

  const handleModeOfDeliveryChange = (event) => {
    setModeOfDelivery(event.target.value)
  }

  const handleWithinMetroManilaChange = () => {
    setWithinMetroManila(!withinMetroManila)
  }

  const handleFirstAcknowledgmentChange = () => {
    setFirstAcknowledgment(!firstAcknowledgment)
  }

  const handleSecondAcknowledgmentChange = () => {
    setSecondAcknowledgment(!secondAcknowledgment)
  }

  const checkIfConfirmButtonShouldBeDisabled = () => {
    if (
      cart.length > 0 &&
      fullName &&
      email &&
      contactNumber &&
      facebookLink &&
      modeOfDelivery &&
      firstAcknowledgment &&
      secondAcknowledgment
    ) {
      if (modeOfDelivery === 'ship') {
        if (fullAddress) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    } else {
      return true
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    await createRecord({
      base: 'merchBase',
      tableName: 'Orders',
      record: {
        'Order Number': orderNumber,
        'Total Price': total,
        Status: 'Unpaid',
        'Full Name': fullName,
        Email: email,
        'Contact Number': contactNumber,
        'Facebook Link': facebookLink,
        'Mode of Delivery': modeOfDelivery,
        'Full Address': fullAddress || 'N/A',
        'Within Metro Manila': withinMetroManila,
      },
    })

    let newMerchData = await getData()

    let createdRecordID = newMerchData.filter((order) => {
      return order['Order Number'] === orderNumber
    })[0]?.RecordID

    let productID

    for (let i = 0; i < cart.length; i++) {
      for (let j = 0; j < productsData.length; j++) {
        if (productsData[j]?.Name === cart[i]?.name) {
          productID = productsData[j]?.RecordID
          break
        }
      }
      await createRecord({
        base: 'merchBase',
        tableName: 'Subitems',
        record: {
          Name: cart[i]?.name,
          Size: cart[i]?.selectedCategory || 'N/A',
          Quantity: cart[i]?.quantity,
          Order: [createdRecordID],
          Product: [productID],
        },
      })
    }
    emptyCart()
    setOrderNumber(orderNumber)
    navigate('/merch/complete')
    setLoading(false)
  }

  return (
    <Layout>
      <div className="m-12">
        <div className="flex">
          <FontAwesomeIcon
            className="w-[50px] h-[50px] text-[#2097A2]"
            icon={faCircleUser}
          />
          <p className="text-3xl lg:text-5xl font-extrabold ml-5">
            Your Order Information
          </p>
        </div>

        <p className="mt-4">
          Please fill up the following fields and ensure the information you’ve
          provided are correct and complete.
        </p>

        <div className="mt-4 flex flex-col lg:flex-row">
          <div className="lg:border-r-2 border-[#D9E8EC] lg:pr-12 w-full lg:w-[60%] order-2 lg:order-1 lg:mt-0 mt-12">
            <div>
              <p className="font-bold">Contact Information</p>
              <div className="flex flex-col">
                <input
                  className="border-[3px] border-[#D9E8EC] rounded-lg pl-6 py-4 mt-4"
                  placeholder="Full Name"
                  onChange={handleFullNameChange}
                  value={fullName}
                />
                <input
                  className="border-[3px] border-[#D9E8EC] rounded-lg pl-6 py-4 mt-4"
                  placeholder="Email"
                  onChange={handleEmailChange}
                  value={email}
                />
                <input
                  className="border-[3px] border-[#D9E8EC] rounded-lg pl-6 py-4 mt-4"
                  placeholder="Contact Number"
                  onChange={handleContactNumberChange}
                  value={contactNumber}
                />
                <input
                  className="border-[3px] border-[#D9E8EC] rounded-lg pl-6 py-4 mt-4"
                  placeholder="Facebook Link"
                  onChange={handleFacebookLinkChange}
                  value={facebookLink}
                />
              </div>
            </div>

            <div className="mt-5">
              <p className="font-bold">Mode of Delivery</p>
              <div>
                <label
                  htmlFor="pickup"
                  className="flex items-center cursor-pointer mt-5"
                >
                  <input
                    id="pickup"
                    type="radio"
                    name="modeOfDelivery"
                    value="pickup"
                    className="hidden"
                    checked={modeOfDelivery === 'pickup'}
                    onChange={handleModeOfDeliveryChange}
                  />
                  <div className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-md bg-gray-200 border-opacity-50">
                    {modeOfDelivery === 'pickup' && (
                      <svg
                        className="w-5 h-5 text-white fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.293 6.293l-10 10-4.293-4.293c-.39-.39-1.024-.39-1.414 0-.39.39-.39 1.024 0 1.414l5 5c.39.39 1.024.39 1.414 0l11-11c.39-.39.39-1.024 0-1.414-.39-.39-1.024-.39-1.414 0z" />
                      </svg>
                    )}
                  </div>
                  <span className="ml-2 text-gray-700">Pick up in Ateneo</span>
                </label>

                <label
                  htmlFor="ship"
                  className="flex items-center cursor-pointer mt-5"
                >
                  <input
                    id="ship"
                    type="radio"
                    name="modeOfDelivery"
                    value="ship"
                    className="hidden"
                    checked={modeOfDelivery === 'ship'}
                    onChange={handleModeOfDeliveryChange}
                  />
                  <div className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-md bg-gray-200 border-opacity-50">
                    {modeOfDelivery === 'ship' && (
                      <svg
                        className="w-5 h-5 text-white fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.293 6.293l-10 10-4.293-4.293c-.39-.39-1.024-.39-1.414 0-.39.39-.39 1.024 0 1.414l5 5c.39.39 1.024.39 1.414 0l11-11c.39-.39.39-1.024 0-1.414-.39-.39-1.024-.39-1.414 0z" />
                      </svg>
                    )}
                  </div>
                  <span className="ml-2 text-gray-700">Ship to my address</span>
                </label>

                {modeOfDelivery === 'ship' ? (
                  <div className="mt-5">
                    <p className="font-bold">Full Address</p>
                    <label
                      htmlFor="WithinMetroManila"
                      className="flex items-center cursor-pointer mt-5"
                    >
                      <input
                        id="WithinMetroManila"
                        type="checkbox"
                        name="modeOfDelivery"
                        value="WithinMetroManila"
                        className="hidden"
                        checked={withinMetroManila}
                        onChange={handleWithinMetroManilaChange}
                      />
                      <div className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-md bg-gray-200 border-opacity-50">
                        {withinMetroManila && (
                          <svg
                            className="w-5 h-5 text-white fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.293 6.293l-10 10-4.293-4.293c-.39-.39-1.024-.39-1.414 0-.39.39-.39 1.024 0 1.414l5 5c.39.39 1.024.39 1.414 0l11-11c.39-.39.39-1.024 0-1.414-.39-.39-1.024-.39-1.414 0z" />
                          </svg>
                        )}
                      </div>
                      <span className="ml-2 text-gray-700">
                        Within Metro Manila (Please ensure this is correct to
                        pay the correct shipping fee.)
                      </span>
                    </label>
                    <textarea
                      className="border-[3px] border-[#D9E8EC] rounded-lg pl-6 py-4 mt-4 w-full"
                      placeholder="Full Address"
                      onChange={handleFullAddressChange}
                      value={fullAddress}
                    />
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-5">
              <p className="font-bold">Additional Information</p>

              {modeOfDelivery === 'pickup' ? (
                <p className="mt-5">
                  An email will be sent to you when and where the pick-up will
                  be.
                </p>
              ) : (
                <div className="mt-5">
                  <p>Shipping fees: </p>
                  <p>Metro Manila - ₱54.00 </p>
                  <p>Nationwide - ₱64.00</p>
                </div>
              )}
            </div>

            <div className="mt-5">
              <p className="font-bold">Acknowledgments</p>
              <label
                htmlFor="firstAcknowledgment"
                className="flex items-center cursor-pointer mt-5"
              >
                <input
                  id="firstAcknowledgment"
                  type="radio"
                  name="firstAcknowledgment"
                  value="firstAcknowledgment"
                  className="hidden"
                  checked={firstAcknowledgment}
                  onChange={handleFirstAcknowledgmentChange}
                />
                <div className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-md bg-gray-200 border-opacity-50">
                  {firstAcknowledgment && (
                    <svg
                      className="w-5 h-5 text-white fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.293 6.293l-10 10-4.293-4.293c-.39-.39-1.024-.39-1.414 0-.39.39-.39 1.024 0 1.414l5 5c.39.39 1.024.39 1.414 0l11-11c.39-.39.39-1.024 0-1.414-.39-.39-1.024-.39-1.414 0z" />
                    </svg>
                  )}
                </div>
                <span className="ml-2 text-gray-700">
                  I acknowledge that my items are pre-orders (You will be
                  informed via email once your items has been shipped out; ETA:
                  First two weeks of May)
                </span>
              </label>

              <label
                htmlFor="secondAcknowledgment"
                className="flex items-center cursor-pointer mt-5"
              >
                <input
                  id="secondAcknowledgment"
                  type="radio"
                  name="secondAcknowledgment"
                  value="secondAcknowledgment"
                  className="hidden"
                  checked={secondAcknowledgment}
                  onChange={handleSecondAcknowledgmentChange}
                />
                <div className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-md bg-gray-200 border-opacity-50">
                  {secondAcknowledgment && (
                    <svg
                      className="w-5 h-5 text-white fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.293 6.293l-10 10-4.293-4.293c-.39-.39-1.024-.39-1.414 0-.39.39-.39 1.024 0 1.414l5 5c.39.39 1.024.39 1.414 0l11-11c.39-.39.39-1.024 0-1.414-.39-.39-1.024-.39-1.414 0z" />
                    </svg>
                  )}
                </div>
                <span className="ml-2 text-gray-700">
                  My payment will be done within the week of the purchase date.
                  (Otherwise your order will be cancelled; Payment can be done
                  in the next step or in a separate page of the site of May)
                </span>
              </label>
            </div>

            <div className="mt-8 flex justify-between">
              <Link to="/merch/cart">
                <div className="flex">
                  <StaticImage
                    className="w-[30px] h-[30px] mr-4"
                    src="../../../../static/images/merchBack.png"
                  />
                  <p className="text-[#31ADAF] text-lg">Back to cart</p>
                </div>
              </Link>

              <Button
                loading={loading}
                onClick={handleSubmit}
                className="w-1/3"
                variant="primary"
                disabled={checkIfConfirmButtonShouldBeDisabled()}
              >
                Confirm
              </Button>
            </div>
          </div>

          <div className="lg:pl-12 w-full lg:w-[40%] order-1 lg:order-2">
            <div className="pb-5 border-b-2 border-[#D9E8EC]">
              {cart.map((item) => {
                return (
                  <div className="flex justify-between mb-6">
                    <div className="flex w-2/3">
                      <img
                        alt="merch"
                        className="w-[80px] h-[80px]"
                        src={item?.photoURL}
                      />
                      <div className="ml-5">
                        <p>{item?.name}</p>
                        {item?.selectedCategory ? (
                          <p className="mt-2">Size: {item?.selectedCategory}</p>
                        ) : null}

                        <p className="mt-2">{`${item?.quantity}pc${
                          item.quantity > 1 ? 's' : ''
                        }`}</p>
                      </div>
                    </div>
                    <p className="font-medium text-xl">
                      ₱{parseFloat(item.totalPrice).toFixed(2)}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="py-5 border-b-2 border-[#D9E8EC]">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p className="font-medium text-xl">
                  ₱{parseFloat(subTotal).toFixed(2)}
                </p>
              </div>

              <div className="flex justify-between">
                <p>Shipping</p>
                <p className="font-medium text-xl">
                  ₱
                  {modeOfDelivery === 'ship'
                    ? withinMetroManila
                      ? parseFloat(54.0).toFixed(2)
                      : parseFloat(64.0).toFixed(2)
                    : parseFloat(0.0).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-between">
                <p className="font-medium text-xl">Total</p>
                <p className="font-medium text-xl">
                  ₱{parseFloat(total).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Checkout

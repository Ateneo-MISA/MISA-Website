import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { Link, navigate } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleUser,
  faArrowLeftLong,
} from '@fortawesome/free-solid-svg-icons'

import Layout from '../../../components/Layout/index'
import Button from '../../Elements/Button'

import useContentfulDynamicContent from '../../../hooks/useContentfulDynamicContent'
import { MerchContext } from '../MerchContext'
import { getRecords, createRecord } from '../../../services/airtable'
import { merchCheckoutValidationSchema } from '../../../utils/merchCheckoutValidationSchema'
import FormInput from '../../Elements/FormInput'

const GATSBY_MERCH_SEND_EMAIL_WEBHOOK =
  process.env.GATSBY_MERCH_SEND_EMAIL_WEBHOOK

const Checkout = () => {
  const dynamicContentFirstAcknowledgment =
    useContentfulDynamicContent()?.filter((content) => {
      return content?.name === 'MISA Merch Checkout First Acknowledgment'
    })[0]

  const dynamicContentSecondAcknowledgment =
    useContentfulDynamicContent()?.filter((content) => {
      return content?.name === 'MISA Merch Checkout Second Acknowledgment'
    })[0]

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
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
    try {
      await merchCheckoutValidationSchema.validate(
        {
          FullName: fullName,
          Email: email,
          ContactNumber: contactNumber,
          FacebookLink: facebookLink,
        },
        { abortEarly: false }
      )

      setErrors([])

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

        if (cart[i]?.bundle) {
          for (let k = 0; k < cart[i]?.bundleItems.length; k++) {
            let productID

            for (let l = 0; l < productsData.length; l++) {
              if (productsData[l]?.Name === cart[i]?.bundleItems[k]?.name) {
                productID = productsData[l]?.RecordID
                break
              }
            }

            await createRecord({
              base: 'merchBase',
              tableName: 'Subitems',
              record: {
                Name: cart[i]?.bundleItems[k]?.name,
                Size: cart[i]?.bundleItems[k]?.selectedCategory || 'N/A',
                Quantity: cart[i]?.quantity,
                Order: [createdRecordID],
                Product: [productID],
              },
            })
          }
        }
      }

      setOrderNumber(orderNumber)

      let contactInformationBody = `Full Name: ${fullName}<br>Email: ${email}<br>Contact Number: ${contactNumber}<br>Facebook Link: ${facebookLink}<br>Mode of Delivery: ${modeOfDelivery}<br>Address: ${
        fullAddress || 'N/A'
      }`

      let orderBody = `Order Number: <b>${orderNumber}</b><br><br>${cart.map(
        (item) => {
          return `${item?.name} ${
            item?.selectedCategory ? `(${item?.selectedCategory})` : ''
          }: ${item?.quantity}pc${
            item?.quantity > 1 ? 's' : ''
          } - ₱${parseFloat(item?.totalPrice).toFixed(2)}<br>`
        }
      )}<br>Shipping: ₱${
        modeOfDelivery === 'ship'
          ? withinMetroManila
            ? parseFloat(54.0).toFixed(2)
            : parseFloat(64.0).toFixed(2)
          : parseFloat(0.0).toFixed(2)
      }<br><br>Total Price: ₱${parseFloat(total).toFixed(2)}<br>`.replace(
        ',',
        ''
      )

      await axios.post(GATSBY_MERCH_SEND_EMAIL_WEBHOOK, {
        email,
        fullName,
        orderBody,
        contactInformationBody,
        orderNumber,
      })

      emptyCart()
      navigate('/merch/complete')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setErrors(error.inner)
    }
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
          <div className="lg:border-r-2 border-[#D9E8EC] lg:pr-12 w-full lg:w-[70%] order-2 lg:order-1 lg:mt-0 mt-12">
            <div>
              <p className="font-bold">Contact Information</p>
              <div className="flex flex-col">
                <FormInput
                  name="FullName"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={handleFullNameChange}
                  errors={errors}
                />

                <FormInput
                  name="Email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  errors={errors}
                />

                <FormInput
                  name="ContactNumber"
                  type="number"
                  placeholder="Contact Number (09991234567)"
                  onChange={handleContactNumberChange}
                  value={contactNumber}
                  errors={errors}
                />

                <FormInput
                  name="FacebookLink"
                  placeholder="Facebook Link"
                  onChange={handleFacebookLinkChange}
                  value={facebookLink}
                  errors={errors}
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
                  <div className="w-[30px] h-[30px] flex items-center justify-center border border-gray-400 rounded-md bg-gray-200 border-opacity-50">
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
                  <div className="w-[30PX] h-[30PX] flex items-center justify-center border border-gray-400 rounded-md bg-gray-200 border-opacity-50">
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
                      <div className="w-[30PX] h-[30PX] flex items-center justify-center border border-gray-400 rounded-md bg-gray-200 border-opacity-50">
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
                  type="checkbox"
                  name="firstAcknowledgment"
                  value="firstAcknowledgment"
                  className="hidden"
                  checked={firstAcknowledgment}
                  onChange={handleFirstAcknowledgmentChange}
                />
                <div className="w-[30px] h-[30px] flex items-center justify-center border border-gray-400 rounded-md bg-gray-200 border-opacity-50">
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
                  I acknowledge that my items are pre-orders.
                </span>
              </label>

              <p className="mt-2">
                {dynamicContentFirstAcknowledgment?.content?.content}
              </p>

              <label
                htmlFor="secondAcknowledgment"
                className="flex items-center cursor-pointer mt-5"
              >
                <input
                  id="secondAcknowledgment"
                  type="checkbox"
                  name="secondAcknowledgment"
                  value="secondAcknowledgment"
                  className="hidden"
                  checked={secondAcknowledgment}
                  onChange={handleSecondAcknowledgmentChange}
                />
                <div className="w-[30PX] h-[30PX] flex items-center justify-center border border-gray-400 rounded-md bg-gray-200 border-opacity-50">
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
                </span>
              </label>
            </div>

            <p className="mt-2">
              {dynamicContentSecondAcknowledgment?.content?.content}
            </p>

            {errors.length > 0 ? (
              <div className="mt-12 bg-[#feecf0] rounded-md p-8">
                <p className="text-[#d43c52]">
                  You may have missed some required fields. Please scan through
                  the form and check if your information is complete and valid.
                </p>
              </div>
            ) : null}

            <div className="mt-8 flex justify-between">
              <Link
                to="/merch/cart"
                className="group text-[#2097A2] hover:text-[#31ADAF] ease-in duration-150"
              >
                <div className="flex">
                  <FontAwesomeIcon
                    className="w-[30px] h-[30px] mr-4"
                    icon={faArrowLeftLong}
                  />
                  <p className="text-lg">Back to cart</p>
                </div>
              </Link>

              <Button
                loading={loading}
                onClick={handleSubmit}
                className="mb-12"
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
                          <p className="mt-2">
                            {item?.categoryName}: {item?.selectedCategory}
                          </p>
                        ) : null}

                        {item?.bundleItems
                          ? item?.bundleItems.map((bundleItem) => {
                              return (
                                <div>
                                  {bundleItem?.name}{' '}
                                  {bundleItem?.categoryName
                                    ? `(${bundleItem?.categoryName}: ${bundleItem?.selectedCategory})`
                                    : null}
                                </div>
                              )
                            })
                          : null}

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

import React, { useState, useReducer } from 'react'
import axios from 'axios'
import { StaticImage } from 'gatsby-plugin-image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDesktop, faAt, faUser } from '@fortawesome/free-solid-svg-icons'
import misaLogo from '../../../static/images/misalogo.png'
import misaLogoWhite from '../../../static/images/misalogoWhite.png'

import Layout from '../../components/Layout/index'
import FormInput from '../../components/Elements/FormInput'
import Button from '../Elements/Button'

import { ContactUsReducer, initialState } from '../../context/ContactUsReducer'
import { contactUsValidationSchema } from '../../utils/contactUsValidationSchema'

const GATSBY_CONTACT_US_SEND_EMAIL_WEBHOOK =
  process.env.GATSBY_CONTACT_US_SEND_EMAIL_WEBHOOK

const ContactUs = () => {
  const [contactUsState, contactUsDispatch] = useReducer(
    ContactUsReducer,
    initialState
  )

  const handleInputChange = (event) => {
    let dispatchName = `SET_${event?.target?.name
      ?.replace(/ /g, '_')
      .toUpperCase()}`

    contactUsDispatch({
      type: dispatchName,
      payload: event?.target?.value,
    })
  }

  const handleSubmit = async () => {
    contactUsDispatch({
      type: 'SET_LOADING',
      payload: true,
    })

    contactUsDispatch({
      type: 'SET_LOADING',
      payload: [],
    })

    try {
      await contactUsValidationSchema.validate(
        {
          Name: contactUsState?.name,
          Email: contactUsState?.email,
          Message: contactUsState?.message,
        },
        { abortEarly: false }
      )

      await axios.post(GATSBY_CONTACT_US_SEND_EMAIL_WEBHOOK, {
        contactUsState,
      })

      contactUsDispatch({
        type: 'SET_HAS_ALREADY_SUBMITTED',
        payload: true,
      })

      contactUsDispatch({
        type: 'SET_LOADING',
        payload: false,
      })
    } catch (error) {
      contactUsDispatch({
        type: 'SET_LOADING',
        payload: false,
      })
      contactUsDispatch({
        type: 'SET_ERRORS',
        payload: error.inner,
      })
    }
  }

  const handleReload = () => {
    window.location.replace(window.location.href)
  }

  return (
    <Layout>
      <div className="py-36 px-8 lg:px-24 relative overflow-hidden">
        <StaticImage
          className="max-w-[110px] lg:max-w-[150px] absolute left-[-70px] top-[90px]"
          src="../../../static/images/merchMISABot.png"
        />

        <StaticImage
          quality={100}
          className="absolute right-[-50px] bottom-[-20px] w-[20%]"
          src="../../../static/images/eventshexagons.png"
        />
        <div className="w-full">
          <h1 className="text-4xl font-extrabold">{`${
            contactUsState?.hasAlreadySubmitted
              ? 'Message sent!'
              : 'Want to work with us?'
          }`}</h1>
          <p className="text-lg mt-2 italic">
            {`${
              contactUsState?.hasAlreadySubmitted
                ? 'Please refer to your email for our response :)'
                : 'Shoot us a message and we will get back to your shortly!'
            }`}

            {contactUsState?.hasAlreadySubmitted ? null : (
              <span className="hidden lg:inline lg:pl-16 text-base">
                Please select one service.
              </span>
            )}
          </p>
          {contactUsState?.hasAlreadySubmitted ? null : (
            <p className="text-base mt-2 block lg:hidden">
              Please select one service.
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full order-2 lg:w-1/2 lg:order-1">
            <div className="mt-5">
              <FormInput
                name="Name"
                type="text"
                placeholder="Name"
                onChange={handleInputChange}
                value={contactUsState?.name}
                errors={contactUsState?.errors}
                disabled={contactUsState?.hasAlreadySubmitted}
              />
              <FormInput
                name="Email"
                type="text"
                placeholder="Email"
                onChange={handleInputChange}
                value={contactUsState?.email}
                errors={contactUsState?.errors}
                disabled={contactUsState?.hasAlreadySubmitted}
              />
              <FormInput
                name="Message"
                type="textarea"
                placeholder="Message"
                onChange={handleInputChange}
                value={contactUsState?.message}
                errors={contactUsState?.errors}
                disabled={contactUsState?.hasAlreadySubmitted}
              />
              {contactUsState?.errors?.length > 0 ? (
                <div className="mt-12 bg-[#feecf0] rounded-md p-8">
                  <p className="text-[#d43c52]">
                    You may have missed some required fields. Please scan
                    through the form and check if your information is complete
                    and valid.
                  </p>
                </div>
              ) : null}

              <Button
                loading={contactUsState?.loading}
                disabled={
                  contactUsState?.name &&
                  contactUsState?.email &&
                  contactUsState?.message &&
                  contactUsState?.serviceChoice
                    ? false
                    : true
                }
                onClick={
                  contactUsState?.hasAlreadySubmitted
                    ? handleReload
                    : handleSubmit
                }
                className="mt-5"
                variant="primary"
              >
                {contactUsState?.hasAlreadySubmitted
                  ? 'Send another one!'
                  : 'Submit'}
              </Button>
            </div>
          </div>

          <div className="w-full order-1 lg:w-1/2 lg-order-2">
            <div className="mt-8">
              <div className="flex gap-6">
                <button
                  className={`border-[3px]  rounded-lg px-5 pt-5 pb-9 w-1/2 h-[140px] text-center text-[#2097A2] duration-150 ease-in ${
                    contactUsState?.serviceChoice === 'Web Development'
                      ? 'bg-[#2097A2] text-white border-[#2097A2]'
                      : 'border-[#D9E8EC] hover:bg-[#D9E8EC]'
                  } ${
                    contactUsState?.hasAlreadySubmitted &&
                    contactUsState?.serviceChoice !== 'Web Development'
                      ? 'bg-[#E5E5E5]'
                      : ''
                  }`}
                  disabled={contactUsState?.hasAlreadySubmitted}
                  onClick={() =>
                    contactUsDispatch({
                      type: 'SET_SERVICE_CHOICE',
                      payload: 'Web Development',
                    })
                  }
                >
                  <FontAwesomeIcon className="w-[50px] h-[50px]" icon={faAt} />
                  <p className="mt-2">Web Development</p>
                </button>
                <button
                  className={`border-[3px]  rounded-lg px-5 pt-5 pb-9 w-1/2 h-[140px] text-center text-[#2097A2] duration-150 ease-in ${
                    contactUsState?.serviceChoice === 'Systems Development'
                      ? 'bg-[#2097A2] text-white border-[#2097A2]'
                      : 'border-[#D9E8EC] hover:bg-[#D9E8EC]'
                  } ${
                    contactUsState?.hasAlreadySubmitted &&
                    contactUsState?.serviceChoice !== 'Systems Development'
                      ? 'bg-[#E5E5E5]'
                      : ''
                  }`}
                  disabled={contactUsState?.hasAlreadySubmitted}
                  onClick={() =>
                    contactUsDispatch({
                      type: 'SET_SERVICE_CHOICE',
                      payload: 'Systems Development',
                    })
                  }
                >
                  <FontAwesomeIcon
                    className="w-[50px] h-[50px]"
                    icon={faDesktop}
                  />
                  <p className="mt-2">Systems Development</p>
                </button>
              </div>

              <div className="flex gap-6 mt-5">
                <button
                  className={`border-[3px]  rounded-lg px-5 pt-5 pb-9 w-1/2 h-[140px] text-center text-[#2097A2] duration-150 ease-in ${
                    contactUsState?.serviceChoice === 'IT Consultancy'
                      ? 'bg-[#2097A2] text-white border-[#2097A2]'
                      : 'border-[#D9E8EC] hover:bg-[#D9E8EC]'
                  } ${
                    contactUsState?.hasAlreadySubmitted &&
                    contactUsState?.serviceChoice !== 'IT Consultancy'
                      ? 'bg-[#E5E5E5]'
                      : ''
                  }`}
                  disabled={contactUsState?.hasAlreadySubmitted}
                  onClick={() =>
                    contactUsDispatch({
                      type: 'SET_SERVICE_CHOICE',
                      payload: 'IT Consultancy',
                    })
                  }
                >
                  <FontAwesomeIcon
                    className="w-[50px] h-[50px]"
                    icon={faUser}
                  />
                  <p className="mt-2">IT Consultancy</p>
                </button>
                <button
                  className={`border-[3px]  rounded-lg px-5 pt-5 pb-9 w-1/2 h-[140px] text-center text-[#2097A2] duration-150 ease-in ${
                    contactUsState?.serviceChoice === 'Others'
                      ? 'bg-[#2097A2] text-white border-[#2097A2]'
                      : 'border-[#D9E8EC] hover:bg-[#D9E8EC]'
                  } ${
                    contactUsState?.hasAlreadySubmitted &&
                    contactUsState?.serviceChoice !== 'Others'
                      ? 'bg-[#E5E5E5]'
                      : ''
                  }`}
                  disabled={contactUsState?.hasAlreadySubmitted}
                  onClick={() =>
                    contactUsDispatch({
                      type: 'SET_SERVICE_CHOICE',
                      payload: 'Others',
                    })
                  }
                >
                  <img
                    className="w-[50px] h-[50px] m-auto"
                    src={
                      contactUsState?.serviceChoice === 'Others'
                        ? misaLogoWhite
                        : misaLogo
                    }
                  />
                  <p className="mt-2">Others</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ContactUs

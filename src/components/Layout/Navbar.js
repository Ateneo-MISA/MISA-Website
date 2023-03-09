import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import useContentfulWebsitePages from '../../hooks/useContentfulWebsitePages'

const Navigation = () => {
  let isAboutUsActive = useContentfulWebsitePages().filter((page) => {
    return page?.name === 'About Us'
  })[0]?.activeOnWebsite

  let isEventsActive = useContentfulWebsitePages().filter((page) => {
    return page?.name === 'Events'
  })[0]?.activeOnWebsite

  let isPartnershipsActive = useContentfulWebsitePages().filter((page) => {
    return page?.name === 'Partnerships'
  })[0]?.activeOnWebsite

  let isServicesActive = useContentfulWebsitePages().filter((page) => {
    return page?.name === 'Services'
  })[0]?.activeOnWebsite

  let isContactUsActive = useContentfulWebsitePages().filter((page) => {
    return page?.name === 'Contact Us'
  })[0]?.activeOnWebsite

  const handleBurgerClick = () => {
    let navbarItems = document.getElementById('navbarItems')
    if (navbarItems.classList.contains('hidden')) {
      navbarItems.classList.remove('hidden')
      navbarItems.classList.add('animate__animated', 'animate__fadeInDown')
    } else {
      navbarItems.classList.add('hidden')
      navbarItems.classList.remove('animate__animated', 'animate__fadeInDown')
    }
  }

  return (
    <nav
      className="text-abc lg:h-16 shadow-md bg-white lg:flex lg:items-center lg:justify-between transition-all ease-in duration-200"
      role="navigation"
      aria-label="Main"
    >
      <div className="flex items-center justify-between">
        <Link to="/">
          <StaticImage
            className="mx-6 my-6 ml-8 w-[143px] h-[25px]"
            src="../../../static/images/navbarlogo.png"
            quality={100}
          />
        </Link>
        <FontAwesomeIcon
          icon={faBars}
          className="lg:hidden block mr-8 cursor-pointer"
          onClick={handleBurgerClick}
        />
      </div>

      <ul
        id="navbarItems"
        className="hidden lg:flex lg:items-center font-abc text-navbarBlack transition-all ease-in duration-200"
      >
        {isAboutUsActive ? (
          <li className="font-light text-abc lg:mx-12 my-4 text-base w-full text-center whitespace-nowrap">
            <Link
              className="hover:text-misaTeal duration-200 text-abc"
              to="/about-us"
              activeClassName="text-misaTeal"
            >
              About Us
            </Link>
          </li>
        ) : null}

        {isEventsActive ? (
          <li className="font-light lg:mx-12 my-4 text-base w-full text-center whitespace-nowrap">
            <Link
              className="hover:text-misaTeal duration-200"
              to="/events"
              activeClassName="text-misaTeal"
            >
              Events
            </Link>
          </li>
        ) : null}

        {isPartnershipsActive ? (
          <li className="font-light lg:mx-12 my-4 w-full text-base text-center whitespace-nowrap">
            <Link
              className="hover:text-misaTeal duration-200"
              to="/partnerships"
              activeClassName="text-misaTeal"
            >
              Partnerships
            </Link>
          </li>
        ) : null}

        {isServicesActive ? (
          <li className="font-light lg:mx-12 my-4 w-full text-base text-center whitespace-nowrap">
            <Link
              className="hover:text-misaTeal duration-200"
              to="/services"
              activeClassName="text-misaTeal"
            >
              Services
            </Link>
          </li>
        ) : null}

        {isContactUsActive ? (
          <li className="lg:mx-12 my-4 w-full text-base text-center whitespace-nowrap">
            <Link to="/contact-us" activeClassName="text-misaTeal">
              <button className="mx-4 my-4 h-11 w-40 bg-misaTeal rounded-xl text-white hover:bg-misaAlternateTeal duration-200">
                Contact Us
              </button>
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}
export default Navigation

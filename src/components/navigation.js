import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Navigation = () => {
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
      className="lg:h-16 shadow-md bg-white lg:flex lg:items-center lg:justify-between transition-all ease-in duration-200"
      role="navigation"
      aria-label="Main"
    >
      <div className="flex items-center justify-between">
        <Link to="/">
          <StaticImage
            className="mx-6 my-6 ml-8"
            src="../../static/images/misanavbarlogo.png"
            width={185}
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
        <li className="mx-4 lg:mr-12 my-4 text-base text-center w-full text-center whitespace-nowrap">
          <Link
            className="hover:text-misaTeal duration-200"
            to="/about-us"
            activeClassName="text-misaTeal"
          >
            About Us
          </Link>
        </li>
        <li className="mx-4 mr-12 my-4 text-base w-full text-center whitespace-nowrap">
          <Link
            className="hover:text-misaTeal duration-200"
            to="/events"
            activeClassName="text-misaTeal"
          >
            Events
          </Link>
        </li>
        <li className="mx-4 mr-12 my-4 w-full text-base text-center whitespace-nowrap">
          <Link
            className="hover:text-misaTeal duration-200"
            to="/partnerships"
            activeClassName="text-misaTeal"
          >
            Partnerships
          </Link>
        </li>
        <li className="mx-4 mr-12 my-4 w-full text-base text-center whitespace-nowrap">
          <Link
            className="hover:text-misaTeal duration-200"
            to="/services"
            activeClassName="text-misaTeal"
          >
            Services
          </Link>
        </li>

        <li className="mx-4 mr-12 my-4 w-full text-base text-center whitespace-nowrap">
          <Link to="/contact-us" activeClassName="text-misaTeal">
            <button className="mx-4 my-4 h-11 w-40 bg-misaTeal rounded-xl text-white hover:bg-misaAlternateTeal duration-200">
              Contact Us
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
export default Navigation

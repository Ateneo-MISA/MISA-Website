import React, { useState } from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'

import useContentfulWebsitePages from '../../hooks/useContentfulWebsitePages'
import * as styles from './utils/navbar.module.css'

const Navigation = () => {
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false)
  const trigger = () => {
    let slider = document.getElementById('slider')
    slider.classList.toggle(`${styles.slideDown}`)
    setIsMobileNavbarOpen(!isMobileNavbarOpen)
  }

  let navbarItems = useContentfulWebsitePages()
    .filter((page) => {
      return page?.activeOnWebsite && page?.navbarItem
    })
    .sort((a, b) => a?.navbarOrder - b?.navbarOrder)

  return (
    <nav
      className="text-abc lg:h-18 shadow-md bg-white lg:items-center transition-all ease-in duration-200"
      role="navigation"
      aria-label="Main"
    >
      <div className="flex justify-between items-center">
        <div>
          <Link
            activeClassName="text-red3"
            className="font-semibold text-red3 hover:text-red2"
            to="/"
          >
            <StaticImage
              className="mx-6 ml-8 w-[143px] h-[25px]"
              src="../../../static/images/navbarlogo.png"
              quality={100}
            />
          </Link>
        </div>

        {!isMobileNavbarOpen ? (
          <div className="hidden md:flex gap-14 font-abc my-6 right-0">
            {navbarItems.map((navbarItem) => {
              return (
                <button
                  className={`py-2 ${
                    navbarItem?.name === 'Contact Us'
                      ? 'bg-misaTeal rounded-md mr-6 px-8 text-white hover:bg-[#31ADAF]'
                      : 'hover:text-misaTeal'
                  }`}
                >
                  <Link
                    to={`/${navbarItem?.path}`}
                    activeClassName={`${
                      navbarItem?.name === 'Contact Us'
                        ? 'text-white'
                        : 'text-misaTeal'
                    }`}
                  >
                    <p className="duration-150 ease-in">{navbarItem?.name}</p>
                  </Link>
                </button>
              )
            })}
          </div>
        ) : null}

        <div className={`block ${isMobileNavbarOpen ? `` : 'md:hidden'} m-6`}>
          <button onClick={trigger}>
            <FontAwesomeIcon icon={isMobileNavbarOpen ? faX : faBars} />
          </button>
        </div>
      </div>

      <div id="slider" className={`${styles.slideUp} font-abc`}>
        <div className="text-center">
          {navbarItems.map((navbarItem) => {
            return (
              <Link to={`/${navbarItem?.path}`} activeClassName="text-misaTeal">
                <p className="mx-12 my-4 hover:text-misaTeal duration-150 ease-in">
                  {navbarItem?.name}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
export default Navigation

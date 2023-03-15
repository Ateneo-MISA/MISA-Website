import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

import useContentfulWebsitePages from '../../hooks/useContentfulWebsitePages'

const Footer = () => {
  let isContactUsActive = useContentfulWebsitePages().filter((page) => {
    return page?.name === 'Contact Us'
  })[0]?.activeOnWebsite

  return (
    <footer>
      <div className="bg-[#D9E8EC] h-[120px] flex justify-center items-center gap-x-4 shadow-[inset_0px_0px_10px_5px_rgba(0,0,0,0.1)] z-0">
        <StaticImage
          src="../../../static/images/misabothead.png"
          quality={100}
          height={200}
        />
        <div>
          <p className="font-extrabold text-3xl font-montserrat">
            Want to work with us?
          </p>
          {isContactUsActive ? (
            <Link to="/contact-us">
              <div className="flex justify-start gap-x-3">
                <p className="text-misaTeal font-montserrat">Contact Us!</p>
                <img
                  className="hover:scale-125 duration-150"
                  src="/external-link.svg"
                  height="20"
                  width="20"
                />
              </div>
            </Link>
          ) : null}
        </div>
      </div>

      <div className="bg-[#282828] h-[300px] flex justify-center shadow-[0px_20px_0px_0px_rgba(0,0,0,0.3)] z-10 relative">
        <div className="grid place-content-center">
          <div className="flex justify-center">
            <StaticImage
              src="../../../static/images/footerlogo.png"
              quality={100}
              height={30}
            />
          </div>
          <p className="italic text-xl text-[#949494] text-center font-montserrat">
            Building tomorrow through business technology
          </p>
          <div className="flex justify-center gap-x-10 my-5">
            <Link
              to="https://www.facebook.com/Ateneo.MISA"
              className="hover:scale-125 duration-150"
            >
              <StaticImage
                src="../../../static/images/facebooklogo.png"
                quality={100}
                height={30}
              ></StaticImage>
            </Link>

            <Link
              to="https://www.instagram.com/ateneomisa/"
              className="hover:scale-125 duration-150"
            >
              <StaticImage
                src="../../../static/images/instagramlogo.png"
                quality={100}
                height={30}
              ></StaticImage>
            </Link>

            <Link
              to="https://twitter.com/AteneoMISA"
              className="hover:scale-125 duration-150"
            >
              <StaticImage
                src="../../../static/images/twitterlogo.png"
                quality={100}
                height={30}
              ></StaticImage>
            </Link>

            <Link
              to="https://www.linkedin.com/company/ateneomisa/"
              className="hover:scale-125 duration-150"
            >
              <StaticImage
                src="../../../static/images/linkedinlogo.png"
                quality={100}
                height={30}
              ></StaticImage>
            </Link>

            <Link
              to="https://www.tiktok.com/@ateneomisa"
              className="hover:scale-125 duration-150"
            >
              <StaticImage
                src="../../../static/images/tiktoklogo.png"
                quality={100}
                height={30}
              ></StaticImage>
            </Link>

            <Link
              to="mailto: ateneo.misa@gmail.com"
              className="hover:scale-125 duration-150"
            >
              <StaticImage
                src="../../../static/images/emaillogo.png"
                quality={100}
                height={30}
              ></StaticImage>
            </Link>
          </div>
          <p className="font-light text-lg text-[#949494] text-center font-montserrat">
            © 2022 Ateneo Management Information Systems Association -
            MISAvengers
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

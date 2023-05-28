import React from 'react'
import { useState } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

const FAQDrawer = ({ faq }) => {
  const [selected, setSelected] = useState(false)

  return (
    <div>
      <div
        className="flex cursor-pointer text-[#2097A2] hover:text-[#31ADAF] ease-in duration-150"
        onClick={() => setSelected(!selected)}
      >
        <FontAwesomeIcon
          className="text-2xl mr-5 w-[30px] h-[30px]"
          icon={selected ? faMinus : faPlus}
        />
        <p className="text-2xl font-extrabold ">{faq?.question}</p>
      </div>
      {selected ? (
        <p className="text-[#31ADAF] pl-16">{faq?.answer?.answer}</p>
      ) : null}
    </div>
  )
}

export default FAQDrawer

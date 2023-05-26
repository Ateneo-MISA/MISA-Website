import React from 'react'
import { useState } from 'react'
import { StaticImage } from 'gatsby-plugin-image'

const FAQDrawer = ({ faq }) => {
  const [selected, setSelected] = useState(false)

  return (
    <div>
      <div
        className="flex cursor-pointer"
        onClick={() => setSelected(!selected)}
      >
        {selected ? (
          <StaticImage
            className="w-[50px] h-[50px] mr-2"
            src="../../../static/images/merchDrawerMinus.png"
          />
        ) : (
          <StaticImage
            className="w-[50px] h-[50px] mr-2"
            src="../../../static/images/merchDrawerPlus.png"
          />
        )}
        <p className="text-2xl font-extrabold text-[#31ADAF] pt-2">
          {faq?.question}
        </p>
      </div>
      {selected ? (
        <p className="text-[#31ADAF] pl-16">{faq?.answer?.answer}</p>
      ) : null}
    </div>
  )
}

export default FAQDrawer

import React from 'react'

const Hero = ({ children }) => {
  return (
    <div className="bg-navbarBlack px-20 py-24 text-left font-abc text-white relative overflow-hidden lg:h-[650px]">
      {children}
    </div>
  )
}

export default Hero

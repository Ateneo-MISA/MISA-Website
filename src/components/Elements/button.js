import React from 'react'

const Button = ({ children, disabled, variant, className }) => {
  return (
    <button
      className={`text-xl text-abc py-2.5 px-5 rounded-md hover:cursor-pointer duration-200 ${className} ${
        variant === 'primary'
          ? 'bg-[#2097A2] text-white hover:bg-[#31ADAF] hover:text-white'
          : variant === 'secondary'
          ? 'bg-[#D9E8EC] text-[#2097A2] hover:bg-white hover:text-[#2097A2]'
          : variant === 'tertiary'
          ? 'border-2 text-white hover:bg-white hover:text-black'
          : ''
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button

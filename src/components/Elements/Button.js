import React from 'react'
import Loader from './Loader'

const Button = ({
  children,
  disabled,
  variant,
  className,
  onClick,
  loading,
}) => {
  if (loading) {
    disabled = true
  }
  return (
    <button
      className={`text-xl text-abc py-2.5 px-5 rounded-md hover:cursor-pointer duration-200 ${className} ${
        variant === 'primary'
          ? 'bg-[#2097A2] text-white hover:bg-[#31ADAF] hover:text-white'
          : variant === 'secondary'
          ? 'bg-[#D9E8EC] text-[#2097A2] hover:bg-white hover:text-[#2097A2]'
          : variant === 'tertiary'
          ? 'border-2 border-misaTeal text-misaTeal hover:bg-misaTeal hover:text-white'
          : variant === 'quaternary'
          ? 'border-2 border-white text-white bg-transparent hover:bg-white hover:text-black'
          : ''
      } ${
        disabled
          ? 'bg-[#E5E5E5] text-[#6B7279] hover:bg-[#E5E5E5] hover:text-[#6B7279] hover:cursor-default'
          : ''
      }`}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading ? <Loader variant="primary" width={'20px'} /> : children}
    </button>
  )
}

export default Button

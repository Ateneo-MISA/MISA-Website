import React from 'react'

const FormInput = ({
  name,
  type,
  placeholder,
  onChange,
  value,
  errors,
  disabled,
}) => {
  let errorMessage = errors.filter((error) => {
    return error?.path === name
  })[0]?.message

  switch (type) {
    case 'textarea':
      return (
        <div>
          <textarea
            name={name}
            className={`border-[3px] border-[#D9E8EC] rounded-lg pl-6 py-4 mt-4 w-full min-h-[140px] ${
              disabled ? 'text-[#6B7279] bg-[#E5E5E5]' : ''
            }`}
            type={type || 'text'}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            disabled={disabled}
          />
          {errorMessage ? (
            <p className="text-[#d43c52] mt-3">{errorMessage}</p>
          ) : null}
        </div>
      )
    default:
      return (
        <div>
          <input
            name={name}
            className={`border-[3px] border-[#D9E8EC] rounded-lg pl-6 py-4 mt-4 w-full ${
              disabled ? 'text-[#6B7279] bg-[#E5E5E5]' : ''
            }`}
            type={type || 'text'}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            disabled={disabled}
          />
          {errorMessage ? (
            <p className="text-[#d43c52] mt-3">{errorMessage}</p>
          ) : null}
        </div>
      )
  }
}

export default FormInput

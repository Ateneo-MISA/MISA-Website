import React from 'react'

const FormInput = ({ name, type, placeholder, onChange, value, errors }) => {
  let errorMessage = errors.filter((error) => {
    return error?.path === name
  })[0]?.message

  return (
    <div>
      <input
        className="border-[3px] border-[#D9E8EC] rounded-lg pl-6 py-4 mt-4 w-full"
        type={type || 'text'}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {errorMessage ? (
        <p className="text-[#d43c52] mt-3">{errorMessage}</p>
      ) : null}
    </div>
  )
}

export default FormInput

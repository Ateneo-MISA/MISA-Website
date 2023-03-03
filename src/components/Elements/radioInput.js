import React from 'react'

const RadioInput = (value, name, checked, id, label) => {
  return (
    <div>
      <input type="radio" value={value} name={name} checked={checked} />
      <label for={id}>{label}</label>
    </div>
  )
}

export default RadioInput

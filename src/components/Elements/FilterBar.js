import React from 'react'

const FilterBar = ({ className, options, setSelected, selected }) => {
  return (
    <div className={`${className} flex gap-4 my-4 flex-wrap`}>
      {options.map((option, index) => {
        return (
          <button
            className={`${
              selected === option
                ? 'bg-[#2096A1] text-white'
                : 'text-[#2096A1] bg-[#D9E8EC]'
            } font-medium py-2 px-4 rounded-xl hover:cursor-pointer hover:bg-[#2096A1] hover:text-white duration-200`}
            onClick={() => setSelected(option)}
            key={index}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

export default FilterBar

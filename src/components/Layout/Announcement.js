import React from 'react'
import { Link } from 'gatsby'

const Announcement = () => {
  return (
    <div className="bg-misaTeal text-white text-center py-4">
      <p className="font-light italic">
        MISA Executive Board 2024 Elections are under way! See candidates and
        vote now{' '}
        <Link className="underline" to="/elections">
          here
        </Link>
        !
      </p>
    </div>
  )
}

export default Announcement

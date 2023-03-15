import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'

import useContentfulAnnouncements from '../../hooks/useContentfulAnnouncements'

const Announcement = () => {
  let announcements = useContentfulAnnouncements()

  let currentAnnouncement = announcements.filter((announcement) => {
    return moment().isBetween(
      announcement?.startDate,
      announcement?.endDate,
      undefined,
      []
    )
  })[0]

  if (!currentAnnouncement) {
    return null
  }

  return (
    <div className="bg-misaTeal text-white text-center px-2 py-4 font-abc">
      <p className="font-light italic text-sm sm:text-base">
        {`${currentAnnouncement?.body}`}
        <Link className="underline" to={currentAnnouncement?.link}>
          here!
        </Link>
      </p>
    </div>
  )
}

export default Announcement

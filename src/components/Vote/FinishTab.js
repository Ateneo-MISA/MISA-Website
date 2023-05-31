import React, { useEffect } from 'react'
import moment from 'moment'

import { StaticImage } from 'gatsby-plugin-image'
import Button from '../Elements/Button'

import useContentfulDynamicContent from '../../hooks/useContentfulDynamicContent'

const FinishTab = ({ voteDispatch }) => {
  const dynamicContentResults = useContentfulDynamicContent()?.filter(
    (content) => {
      return content?.name === 'MISAlalan Results Date'
    }
  )[0]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex flex-col min-[900px]:flex-row justify-center items-center min-[900px]:mt-28">
      <StaticImage
        src="../../../static/images/misabot.png"
        className="w-[70%] min-[900px]:w-[25%] min-[900px]:mr-10"
      />

      <div className="flex flex-col text-center min-[900px]:text-left mt-4">
        <h1 className="text-5xl font-extrabold text-misaTeal">
          Thanks for voting!
        </h1>

        <p className="italic mt-4 text-xl">Your vote has been submitted.</p>
        <p className="italic mt-4 text-xl">
          Stay tuned for the MISAlalan {moment().format('YYYY')} Results on{' '}
          {moment(dynamicContentResults?.date).format('MMMM DD, YYYY')}!
        </p>

        <a href="../elections">
          <Button className={'mt-4 w-[60%] px-1'} variant="primary">
            Go back to elections homepage
          </Button>
        </a>
      </div>
    </div>
  )
}

export default FinishTab

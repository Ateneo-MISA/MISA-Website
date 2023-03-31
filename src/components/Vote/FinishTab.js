import React, { useEffect } from 'react'

import { StaticImage } from 'gatsby-plugin-image'
import Button from '../Elements/Button'

const FinishTab = ({ voteDispatch }) => {
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
          Stay tuned for the MISAlalan 2023 Results on April 14, 2023!
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

import React, { useEffect, useReducer } from 'react'

import Layout from '../Layout/index'
import { getRecords } from '../../services/airtable'
import { StaticImage } from 'gatsby-plugin-image'

import Loader from '../Elements/Loader'
import ActiveTab from './ActiveTab'
import { VoteReducer, initialState } from '../../context/VoteReducer'

import useContentfulElectionPositions from './hooks/useContentfulElectionPositions'

const Vote = () => {
  let positionsData = useContentfulElectionPositions()

  const [voteState, voteDispatch] = useReducer(VoteReducer, initialState)

  const getData = async () => {
    let votersData = await getRecords({
      base: 'votingBase',
      tableName: 'Voters',
    })

    let candidatesData = await getRecords({
      base: 'votingBase',
      tableName: 'Candidates',
    })

    voteDispatch({ type: 'SET_VOTERS_DATA', payload: votersData })
    voteDispatch({ type: 'SET_CANDIDATES_DATA', payload: candidatesData })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getData()
  }, [])

  return (
    <Layout>
      {voteState?.votersData ? (
        <div className="font-abc my-10 sm:my-20">
          <div className="flex flex-col sm:flex-row text-center justify-center mb-8">
            <div
              className={`text-misaTeal flex flex-col items-center
            ${
              voteState?.activeTab === 'VotingForm'
                ? 'opacity-30 max-[900px]:hidden'
                : voteState?.activeTab === 'Submit'
                ? 'opacity-30 max-[900px]:hidden'
                : voteState?.activeTab === 'Finish'
                ? 'opacity-30 max-[900px]:hidden'
                : ''
            } 
            `}
            >
              <h1 className="text-4xl font-extrabold">1</h1>
              <StaticImage
                quality={100}
                className={`max-w-[60px] md:max-w-[100px] mt-2 text-center`}
                src="../../../static/images/id-blue.png"
              />
              <p className="text-base">Check Eligibility</p>
            </div>

            <div className="border-t-2 border-[#D9E8EC] mx-8 mt-24 w-1/4 max-[900px]:hidden"></div>
            <div
              className={`text-misaTeal flex flex-col justify-center items-center
              ${
                voteState?.activeTab === 'Eligibility'
                  ? 'opacity-30 max-[900px]:hidden'
                  : voteState?.activeTab === 'Submit'
                  ? 'opacity-30 max-[900px]:hidden'
                  : voteState?.activeTab === 'Finish'
                  ? 'opacity-30 max-[900px]:hidden'
                  : ''
              }  
            `}
            >
              <h1 className="text-4xl font-extrabold">2</h1>
              <StaticImage
                quality={100}
                className={`max-w-[60px] md:max-w-[80px] my-3 text-center`}
                src="../../../static/images/checkbox-blue.png"
              />
              <p className="text-base">Vote</p>
            </div>
            <div className="border-t-2 border-[#D9E8EC] mx-8 mt-24 w-1/4 max-[900px]:hidden"></div>
            <div
              className={`text-misaTeal flex flex-col items-center
              ${
                voteState?.activeTab === 'Eligibility'
                  ? 'opacity-30 max-[900px]:hidden'
                  : voteState?.activeTab === 'VotingForm'
                  ? 'opacity-30 max-[900px]:hidden'
                  : voteState?.activeTab === 'Finish'
                  ? 'opacity-30 max-[900px]:hidden'
                  : ''
              } 
            `}
            >
              <h1 className="text-4xl font-extrabold">3</h1>
              <StaticImage
                quality={100}
                className={`max-w-[60px] md:max-w-[100px] mt-3 text-center`}
                src="../../../static/images/voting-ballot-blue.png"
              />
              <p className="text-base">Submit</p>
            </div>
          </div>

          <ActiveTab
            activeTab={voteState?.activeTab}
            voteState={voteState}
            voteDispatch={voteDispatch}
            positionsData={positionsData}
          />
        </div>
      ) : (
        <div className="m-auto text-center mt-20">
          <Loader width="150px" color="#31ADAF" variant="primary" />
        </div>
      )}
    </Layout>
  )
}

export default Vote

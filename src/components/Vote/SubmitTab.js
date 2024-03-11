import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Button from '../Elements/Button'

import useContentfulElectionCandidates from '../../components/Elections/hooks/useContentfulElectionCandidates'

import { createRecord, updateRecord } from '../../services/airtable'
import useContentfulElectionPositions from '../Elections/hooks/useContentfulElectionPositions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'

const GATSBY_VOTING_SEND_EMAIL_WEBHOOK =
  process.env.GATSBY_VOTING_SEND_EMAIL_WEBHOOK

const SubmitTab = ({ voteState, voteDispatch }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [loading, setLoading] = useState(false)
  let candidates = useContentfulElectionCandidates()

  let finalPositionsData = useContentfulElectionPositions()
    ?.filter((position) => {
      return position?.activeOnWebsite
    })
    ?.sort((a, b) => a?.orderOnWebsite - b?.orderOnWebsite)

  const handleSubmit = async () => {
    setLoading(true)
    let finalVotes = []
    for (let i = 0; i < finalPositionsData?.length; i++) {
      let finalPositionTitle = finalPositionsData[i]?.title
        .toLowerCase()
        .replaceAll(' ', '')

      finalVotes.push(voteState[finalPositionTitle])
    }

    await createRecord({
      base: 'votingBase',
      tableName: 'Ballots',
      record: {
        Voter: [voteState?.currentVoterData?.id],
        Votes: finalVotes,
        Name: voteState?.currentVoterData?.Name,
      },
    })

    await updateRecord({
      base: 'votingBase',
      tableName: 'Voters',
      id: voteState?.currentVoterData?.id,
      fields: {
        HasAlreadyVoted: true,
      },
    })

    // await axios.post(GATSBY_VOTING_SEND_EMAIL_WEBHOOK, {
    //   ...voteState?.currentVoterData,
    // })

    voteDispatch({
      type: `SET_ACTIVE_TAB`,
      payload: 'Finish',
    })

    setLoading(false)
  }
  return (
    <div>
      <h2 className="text-5xl font-extrabold text-misaTeal mt-10 text-center">
        Submit Ballot
      </h2>
      <p className="my-4 text-center text-xl">
        Please ensure all these details are correct.
      </p>

      <div className="flex flex-col gap-12 sm:gap-4 sm:flex-row items-center text-center justify-center my-10 text-xl">
        <div className="w-full sm:w-1/3">
          <p className="italic text-misaTeal">Name</p>
          <p className="mt-4 italic">{voteState?.currentVoterData?.Name}</p>
        </div>

        <div className="w-full sm:w-1/3">
          <p className="italic text-misaTeal">Email</p>
          <p className="mt-4 italic">{voteState?.currentVoterData?.Email}</p>
        </div>

        <div className="w-full sm:w-1/3">
          <p className="italic text-misaTeal">ID Number</p>
          <p className="mt-4 italic">{voteState?.currentVoterData?.IDNumber}</p>
        </div>
      </div>

      {finalPositionsData.map((position) => {
        let positionNameInState = position?.title
          .toLowerCase()
          .replaceAll(' ', '')
        let choice = voteState?.candidatesData?.filter(
          (candidate) => candidate?.id === voteState[positionNameInState]
        )

        return (
          <div className="flex justify-center">
            <div className="flex flex-col min-[1600px]:flex-row items-center justify-center min-[1600px]:justify-between w-[60%] mt-20">
              <div className="text-center min-[1600px]:text-left w-full min-[1600px]:w-1/2">
                <h1 className="text-misaTeal text-2xl min-[500px]:text-4xl font-extrabold">
                  {position?.title}
                </h1>
              </div>

              <div>
                <div
                  className={`flex flex-row items-center mt-5 py-0 rounded-xl w-full`}
                >
                  <div
                    className={`bg-[#D9E8EC] flex items-center text-misaTeal px-6 py-6 w-[135px] h-[135px] justify-center rounded-lg rounded-r-none`}
                  >
                    <FontAwesomeIcon
                      icon={faBan}
                      className="w-[80px] h-[60px] rounded-md"
                    />
                  </div>
                  {candidates.map((candidate) => {
                    if (choice[0]['Full Name'] === candidate.name) {
                      return (
                        <img
                          src={candidate?.image?.file?.url}
                          className="absolute w-[135px] h-[135px] rounded-md rounded-r-none"
                          alt="candidateImage"
                        />
                      )
                    } else {
                      return null
                    }
                  })}

                  <div
                    className={`flex border-2 border-[#D9E8EC] rounded-l-none w-full min-[1600px]:w-[420px] h-[135px] rounded-xl`}
                  >
                    <p
                      className={`flex items-center pl-12 italic px-5 text-xl duration-150 ease-in`}
                    >
                      {`${choice[0]['Full Name']}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
      <div className="text-center flex justify-center my-10">
        <Button
          onClick={() =>
            voteDispatch({
              type: `SET_ACTIVE_TAB`,
              payload: 'VotingForm',
            })
          }
          className="mr-20"
          variant="tertiary"
        >
          Back
        </Button>
        <Button loading={loading} onClick={handleSubmit} variant="primary">
          Submit
        </Button>
      </div>
    </div>
  )
}

export default SubmitTab

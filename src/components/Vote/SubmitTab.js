import React from 'react'
import axios from 'axios'

import Button from '../Elements/Button'

import { createRecord, updateRecord } from '../../services/airtable'

const SubmitTab = ({ voteState, voteDispatch, positionsData }) => {
  let finalPositionsData = positionsData?.filter(
    (position) => position?.activeOnWebsite === true
  )

  const handleSubmit = async () => {
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

    // await axios.post(
    //   'https://hook.us1.make.com/ipi8jopvxg8el8jrkju9q3sf65nh4pz1',
    //   {
    //     ...voteState?.currentVoterData,
    //   }
    // )

    voteDispatch({
      type: `SET_ACTIVE_TAB`,
      payload: 'Finish',
    })
  }
  return (
    <div>
      <h2 className="text-5xl text-center">Form: Submit</h2>
      <p className="my-4 text-center">
        Please ensure all these details are correct
      </p>
      <p className="text-center text-4xl">Vote Ballot</p>
      <p className="text-center mt-4">
        Name: {voteState?.currentVoterData?.Name}
      </p>
      <p className="text-center mt-4">
        ID Number: {voteState?.currentVoterData?.IDNumber}
      </p>
      {finalPositionsData.map((position) => {
        let stateChecker = position?.title.toLowerCase().replaceAll(' ', '')
        let choice = voteState?.candidatesData?.filter(
          (candidate) => candidate?.id === voteState[stateChecker]
        )

        return (
          <p className="text-center mt-4">{`${position?.title}: ${choice[0]['Full Name']}`}</p>
        )
      })}
      <div className="text-center flex justify-center mt-20">
        <Button className="mr-8" variant="primary">
          Back
        </Button>
        <Button onClick={handleSubmit} variant="primary">
          Next
        </Button>
      </div>
    </div>
  )
}

export default SubmitTab

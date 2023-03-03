import React, { useContext } from 'react'
import { VoteContext } from '../../pages/vote'

import Button from '../Elements/button'

const EligibilityTab = ({ voteState, voteDispatch }) => {
  const votersData = voteState?.votersData

  const handleVoterIDChange = (event) => {
    voteDispatch({ type: 'SET_VOTER_ID_NUMBER', payload: event.target.value })
  }

  const handleCheckForEligibility = () => {
    voteDispatch({ type: 'SET_HAS_CLICKED_ELIGIBILITY_BUTTON', payload: true })
    voteDispatch({ type: 'SET_VOTER_HAS_VOTED', payload: null })
    voteDispatch({ type: 'SET_VOTER_IS_ELIGIBLE', payload: null })

    for (let i = 0; i < votersData?.length; i++) {
      let idNumberChecker = votersData[i]?.IDNumber

      if (idNumberChecker === voteState?.voterIDNumber) {
        if (votersData[i]?.HasAlreadyVoted) {
          voteDispatch({ type: 'SET_VOTER_HAS_VOTED', payload: true })
          break
        } else {
          if (votersData[i]?.EligibleForVoting) {
            voteDispatch({ type: 'SET_VOTER_IS_ELIGIBLE', payload: true })
            voteDispatch({
              type: 'SET_CURRENT_VOTER_DATA',
              payload: votersData[i],
            })
            break
          } else {
            voteDispatch({ type: 'SET_VOTER_IS_ELIGIBLE', payload: false })
            break
          }
        }
      }
    }
  }

  const handleProceedToVotingForm = () => {
    voteDispatch({ type: 'SET_ACTIVE_TAB', payload: 'VotingForm' })
  }

  return (
    <div className="text-center">
      <h2 className="text-5xl">Form: Check Eligbility</h2>
      <p className="my-4">
        please enter your id number to check if you are eligible for voting
      </p>
      <form>
        <input
          className="w-1/2 box-border p-4 border-4 my-4"
          type="text"
          onChange={handleVoterIDChange}
          value={voteState?.voterIDNumber}
        ></input>
      </form>
      <Button
        className="mb-4"
        variant="primary"
        onClick={handleCheckForEligibility}
        disabled={!voteState?.voterIDNumber}
      >
        Check Eligbility
      </Button>

      {voteState?.hasClickedEligibilityButton ? (
        voteState?.voterHasVoted ? (
          <p>
            You have already voted. Please check your email for the
            confirmation. If this is not the case, please contact us at misa.com
          </p>
        ) : voteState?.voterIsEligible ? (
          <p>Congratulations! You are eligible for voting. Please proceed.</p>
        ) : (
          <p>
            Sorry, but you are not eligible for voting. If you think this is a
            mistake, please contact us at misa.com
          </p>
        )
      ) : null}

      {voteState?.voterIsEligible ? (
        <Button variant="primary" onClick={handleProceedToVotingForm}>
          Next
        </Button>
      ) : null}
    </div>
  )
}

export default EligibilityTab

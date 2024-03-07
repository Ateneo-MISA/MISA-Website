import React, { useEffect } from 'react'

import Button from '../Elements/Button'

const EligibilityTab = ({ voteState, voteDispatch }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const votersData = voteState?.votersData

  const handleVoterIDChange = (event) => {
    voteDispatch({ type: 'SET_VOTER_ID_NUMBER', payload: event.target.value })
  }

  const handleVoterEmailChange = (event) => {
    voteDispatch({ type: 'SET_VOTER_EMAIL', payload: event.target.value })
  }

  const handleCheckForEligibility = () => {
    voteDispatch({ type: 'SET_HAS_CLICKED_ELIGIBILITY_BUTTON', payload: true })
    voteDispatch({ type: 'SET_VOTER_HAS_VOTED', payload: null })
    voteDispatch({ type: 'SET_VOTER_IS_ELIGIBLE', payload: null })

    for (let i = 0; i < votersData?.length; i++) {
      let idNumberChecker = votersData[i]?.IDNumber
      let emailChecker = votersData[i]?.Email

      if (
        idNumberChecker === voteState?.voterIDNumber &&
        emailChecker === voteState?.voterEmail
      ) {
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
    <div className="mx-12 md:mx-24">
      <h2 className="text-5xl font-extrabold text-misaTeal mt-12 text-center">
        Check Eligibility
      </h2>
      <p className="my-4 italic text-center text-xl">
        Please enter your ID number and student email to check if you are eligible
        for voting.
      </p>

      <div className="flex flex-col min-[1000px]:flex-row justify-center items-center md:text-center mt-12">
        <input
          className="box-border border-[3px] rounded-[20px] px-6 py-8 my-5 text-xl mr-5 w-full min-[1000px]:w-1/4"
          type="text"
          placeholder="ID Number"
          onChange={handleVoterIDChange}
          value={voteState?.voterIDNumber}
          disabled={voteState?.voterIsEligible}
        />
        <input
          className="w-full min-[1000px]:w-1/2 box-border border-[3px] rounded-[20px] px-6 py-8 my-5 text-xl mr-5"
          type="text"
          placeholder="Student Email"
          onChange={handleVoterEmailChange}
          value={voteState?.voterEmail}
          disabled={voteState?.voterIsEligible}
        />
        <Button
          className="rounded-[20px] px-6 py-8 my-5"
          variant="primary"
          onClick={handleCheckForEligibility}
          disabled={
            !voteState?.voterIDNumber ||
            !voteState?.voterEmail ||
            voteState?.voterIsEligible
          }
        >
          CHECK
        </Button>
      </div>
      <div className="text-center">
        {voteState?.hasClickedEligibilityButton ? (
          voteState?.voterHasVoted ? (
            <p className="text-[#FF0000]">
              Sorry, you can only vote once. If you think this is a mistake,
              please contact the AdHoc Committee
            </p>
          ) : voteState?.voterIsEligible ? (
            <p className="text-[#2097A2]">
              Congratulations! You are eligible for voting. Please wait for
              the official voting period to cast your vote.
            </p>
          ) : (
            <p className="text-[#FF0000]">
              Sorry, it seems that you're not eligible to vote. If you think
              this is a mistake, please contact the AdHoc Committee.
            </p>
          )
        ) : null}
      </div>

      <div className="flex w-full mt-20 pb-40 justify-center">
        {voteState?.voterIsEligible ? (
          <Button disabled variant="primary" onClick={handleProceedToVotingForm}>
            Next
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default EligibilityTab

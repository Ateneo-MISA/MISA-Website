import React from 'react'

import EligibilityTab from './eligibilityTab'
import VotingFormTab from './votingFormTab'
import SubmitTab from './submitTab'
import FinishTab from './finishTab'

const ActiveTab = ({ activeTab, voteState, voteDispatch, positionsData }) => {
  switch (activeTab) {
    case 'Eligibility':
      return (
        <EligibilityTab voteState={voteState} voteDispatch={voteDispatch} />
      )
    case 'VotingForm':
      return (
        <VotingFormTab
          voteState={voteState}
          voteDispatch={voteDispatch}
          positionsData={positionsData}
        />
      )
    case 'Submit':
      return (
        <SubmitTab
          voteState={voteState}
          voteDispatch={voteDispatch}
          positionsData={positionsData}
        />
      )
    case 'Finish':
      return <FinishTab />
    default:
      return <EligibilityTab />
  }
}

export default ActiveTab

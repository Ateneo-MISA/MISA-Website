import React from 'react'

import EligibilityTab from './EligiblityTab'
import VotingFormTab from './VotingFormTab'
import SubmitTab from './SubmitTab'
import FinishTab from './FinishTab'

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

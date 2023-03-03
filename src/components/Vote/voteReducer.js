const tabs = {
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
}

const eligibility = {
  SET_VOTERS_DATA: 'SET_VOTERS_DATA',
  SET_VOTER_ID_NUMBER: 'SET_VOTER_ID_NUMBER',
  SET_VOTER_IS_ELIGIBLE: 'SET_VOTER_IS_ELIGIBLE',
  SET_VOTER_HAS_VOTED: 'SET_VOTER_HAS_VOTED',
  SET_HAS_CLICKED_ELIGIBILITY_BUTTON: 'SET_HAS_CLICKED_ELIGIBILITY_BUTTON',
  SET_CURRENT_VOTER_DATA: 'SET_CURRENT_VOTER_DATA',
}

const votingForm = {
  SET_CANDIDATES_DATA: 'SET_CANDIDATES_DATA',
  SET_PRESIDENT_CHOICE: 'SET_PRESIDENT_CHOICE',
  SET_VICE_PRESIDENT_FOR_ESERVICES_CHOICE:
    'SET_VICE_PRESIDENT_FOR_ESERVICES_CHOICE',
}

export let initialState = {
  activeTab: 'Eligibility',
  votersData: [],
}

export const VoteReducer = (state, action) => {
  switch (action.type) {
    case tabs.SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload }
    case eligibility.SET_VOTERS_DATA:
      return { ...state, votersData: action.payload }
    case eligibility.SET_VOTER_ID_NUMBER:
      return { ...state, voterIDNumber: action.payload }
    case eligibility.SET_VOTER_IS_ELIGIBLE:
      return { ...state, voterIsEligible: action.payload }
    case eligibility.SET_VOTER_HAS_VOTED:
      return { ...state, voterHasVoted: action.payload }
    case eligibility.SET_HAS_CLICKED_ELIGIBILITY_BUTTON:
      return { ...state, hasClickedEligibilityButton: action.payload }
    case eligibility.SET_CURRENT_VOTER_DATA:
      return { ...state, currentVoterData: action.payload }
    case votingForm.SET_CANDIDATES_DATA:
      return { ...state, candidatesData: action.payload }
    case votingForm.SET_PRESIDENT_CHOICE:
      return { ...state, president: action.payload }
    case votingForm.SET_VICE_PRESIDENT_FOR_ESERVICES_CHOICE:
      return { ...state, vicepresidentforeservices: action.payload }
    default:
      return { ...initialState }
  }
}

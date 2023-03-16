const tabs = {
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
}

const eligibility = {
  SET_VOTERS_DATA: 'SET_VOTERS_DATA',
  SET_VOTER_ID_NUMBER: 'SET_VOTER_ID_NUMBER',
  SET_VOTER_EMAIL: 'SET_VOTER_EMAIL',
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
  SET_VICE_PRESIDENT_FOR_COMMUNICATIONS_CHOICE:
    'SET_VICE_PRESIDENT_FOR_COMMUNICATIONS_CHOICE',
  SET_VICE_PRESIDENT_FOR_MARKETING_CHOICE:
    'SET_VICE_PRESIDENT_FOR_MARKETING_CHOICE',
  SET_VICE_PRESIDENT_FOR_EVENTS_CHOICE: 'SET_VICE_PRESIDENT_FOR_EVENTS_CHOICE',
  SET_VICE_PRESIDENT_FOR_HUMAN_RESOURCES_CHOICE:
    'SET_VICE_PRESIDENT_FOR_HUMAN_RESOURCES_CHOICE',
  SET_SECRETARY_GENERAL_CHOICE: 'SET_SECRETARY_GENERAL_CHOICE',
  SET_EXECUTIVE_TREASURER_CHOICE: 'SET_EXECUTIVE_TREASURER_CHOICE',
}

export let initialState = {
  activeTab: 'Eligibility',
}

export const VoteReducer = (state, action) => {
  switch (action.type) {
    case tabs.SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload }
    case eligibility.SET_VOTERS_DATA:
      return { ...state, votersData: action.payload }
    case eligibility.SET_VOTER_ID_NUMBER:
      return { ...state, voterIDNumber: action.payload }
    case eligibility.SET_VOTER_EMAIL:
      return { ...state, voterEmail: action.payload }
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
    case votingForm.SET_VICE_PRESIDENT_FOR_COMMUNICATIONS_CHOICE:
      return { ...state, vicepresidentforcommunications: action.payload }
    case votingForm.SET_VICE_PRESIDENT_FOR_MARKETING_CHOICE:
      return { ...state, vicepresidentformarketing: action.payload }
    case votingForm.SET_VICE_PRESIDENT_FOR_EVENTS_CHOICE:
      return { ...state, vicepresidentforevents: action.payload }
    case votingForm.SET_VICE_PRESIDENT_FOR_HUMAN_RESOURCES_CHOICE:
      return { ...state, vicepresidentforhumanresources: action.payload }
    case votingForm.SET_SECRETARY_GENERAL_CHOICE:
      return { ...state, secretarygeneral: action.payload }
    case votingForm.SET_EXECUTIVE_TREASURER_CHOICE:
      return { ...state, executivetreasurer: action.payload }
    default:
      return { ...initialState }
  }
}

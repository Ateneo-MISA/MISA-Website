const form = {
  SET_NAME: 'SET_NAME',
  SET_EMAIL: 'SET_EMAIL',
  SET_MESSAGE: 'SET_MESSAGE',
  SET_SERVICE_CHOICE: 'SET_SERVICE_CHOICE',
  SET_LOADING: 'SET_LOADING',
  SET_ERRORS: 'SET_ERRORS',
  SET_HAS_ALREADY_SUBMITTED: 'SET_HAS_ALREADY_SUBMITTED',
}

export let initialState = {
  name: null,
  email: null,
  message: null,
  serviceChoice: null,
  loading: false,
  errors: [],
  hasAlreadySubmitted: false,
}

export const ContactUsReducer = (state, action) => {
  switch (action.type) {
    case form.SET_NAME:
      return { ...state, name: action.payload }
    case form.SET_EMAIL:
      return { ...state, email: action.payload }
    case form.SET_MESSAGE:
      return { ...state, message: action.payload }
    case form.SET_SERVICE_CHOICE:
      return { ...state, serviceChoice: action.payload }
    case form.SET_LOADING:
      return { ...state, loading: action.payload }
    case form.SET_ERRORS:
      return { ...state, errors: action.payload }
    case form.SET_HAS_ALREADY_SUBMITTED:
      return { ...state, hasAlreadySubmitted: action.payload }
    default:
      return { ...initialState }
  }
}

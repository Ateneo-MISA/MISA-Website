import * as Yup from 'yup'

const REQUIRED_MESSAGE = 'This field is required.'

export const contactUsValidationSchema = Yup.object().shape({
  Name: Yup.string().required(REQUIRED_MESSAGE).nullable(),
  Email: Yup.string()
    .email('Please enter a valid Email.')
    .required(REQUIRED_MESSAGE)
    .nullable(),
  Message: Yup.string().required(REQUIRED_MESSAGE).nullable(),
})

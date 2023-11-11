import * as Yup from 'yup'

const REQUIRED_MESSAGE = 'This field is required.'

export const merchCheckoutValidationSchema = Yup.object().shape({
  FullName: Yup.string().required(REQUIRED_MESSAGE).nullable(),
  Email: Yup.string()
    .email('Please enter a valid Email.')
    .required(REQUIRED_MESSAGE)
    .nullable(),
  ContactNumber: Yup.string()
    .matches(
      /^09\d{9}$/,
      'Please input a valid mobile number in this format: 09991234567'
    )
    .required(REQUIRED_MESSAGE)
    .nullable(),
  FacebookLink: Yup.string()
    .matches(
      /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9(\.\?)?]/,
      'Please enter a valid Facebook link in this format: www.facebook.com/Ateneo.MISA'
    )
    .required(REQUIRED_MESSAGE)
    .nullable(),
})

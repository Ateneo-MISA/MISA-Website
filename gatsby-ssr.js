import './static/styles/global.css'

import React from 'react'
import { MerchContextProvider } from './src/components/Merch/MerchContext'

export const wrapRootElement = ({ element }) => {
  return <MerchContextProvider>{element}</MerchContextProvider>
}

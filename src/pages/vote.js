import React, { useEffect, useReducer } from 'react'
import { navigate } from 'gatsby'

import Layout from '../components/Layout/index'
import { getRecords } from '../services/airtable'

import ActiveTab from '../components/Vote/ActiveTab'
import { VoteReducer, initialState } from '../context/VoteReducer'

import useContentfulElectionPositions from '../components/Vote/hooks/useContentfulElectionPositions'

// const VoteContext = React.createContext()

const Vote = () => {
  let positionsData = useContentfulElectionPositions()

  const [voteState, voteDispatch] = useReducer(VoteReducer, initialState)

  const getData = async () => {
    let votersData = await getRecords({
      base: 'votingBase',
      tableName: 'Voters',
    })

    let candidatesData = await getRecords({
      base: 'votingBase',
      tableName: 'Candidates',
    })

    voteDispatch({ type: 'SET_VOTERS_DATA', payload: votersData })
    voteDispatch({ type: 'SET_CANDIDATES_DATA', payload: candidatesData })
  }

  useEffect(() => {
    getData()
  }, [])

  return navigate('/')
  // return (
  //   <Layout>
  //     {/* <VoteContext.Provider value={{ voteState, voteDispatch }}> */}
  //     {voteState?.votersData ? (
  //       <div className="font-abc mt-20">
  //         <div className="flex text-center justify-around mb-8">
  //           <p className="bg-misaTeal">1 Check Eligbility</p>
  //           <p className="ml-4">2 Vote</p>
  //           <p className="ml-4">3 Submit</p>
  //         </div>

  //         <ActiveTab
  //           activeTab={voteState?.activeTab}
  //           voteState={voteState}
  //           voteDispatch={voteDispatch}
  //           positionsData={positionsData}
  //         />
  //       </div>
  //     ) : null}
  //     {/* </VoteContext.Provider> */}
  //   </Layout>
  // )
}

export default Vote

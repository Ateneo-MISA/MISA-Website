import React from 'react'

import Button from '../Elements/Button'
import useContentfulElectionCandidates from '../../components/Elections/hooks/useContentfulElectionCandidates'
import useContentfulElectionPositions from '../Elections/hooks/useContentfulElectionPositions'
import { getAbstainRecordID } from './utils/getAbstainAirtableRecordId'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'

const VotingFormTab = ({ voteState, voteDispatch }) => {
  let positions = useContentfulElectionPositions()
    ?.filter((position) => {
      return position?.activeOnWebsite
    })
    ?.sort((a, b) => a?.orderOnWebsite - b?.orderOnWebsite)
  let candidates = useContentfulElectionCandidates().sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  const handleChooseCandidate = (candidate) => {
    let chosenCandidatePosition = candidate.position
      .toUpperCase()
      .replaceAll(' ', '_')

    let positionNameInState = candidate?.position
      .toLowerCase()
      .replaceAll(' ', '')

    if (voteState[positionNameInState] === candidate?.airtableRecordId) {
      voteDispatch({
        type: `SET_${chosenCandidatePosition}_CHOICE`,
        payload: null,
      })
    } else {
      voteDispatch({
        type: `SET_${chosenCandidatePosition}_CHOICE`,
        payload: candidate?.airtableRecordId,
      })
    }
  }

  const handleCheckIfComplete = () => {
    let disabled = false
    for (let i = 0; i < positions?.length; i++) {
      let positionNameInState = positions[i]?.title
        ?.toLowerCase()
        ?.replaceAll(' ', '')

      if (!voteState[positionNameInState]) {
        disabled = true
        break
      }
    }

    return disabled
  }

  return (
    <div>
      <h2 className="text-5xl text-center font-extrabold text-misaTeal mt-12">
        Vote
      </h2>
      <p className="my-4 text-center italic text-xl">
        Please choose the candidates that you would like to vote for.
      </p>
      <form className="px-12 lg:px-24">
        {positions?.map((position) => {
          let positionNameInState = position?.title
            ?.toLowerCase()
            ?.replaceAll(' ', '')
          let specificPositionCandidates = candidates?.filter((candidate) => {
            return candidate?.position?.title === position?.title
          })

          return (
            <div className="mt-10">
              <p className="font-extrabold text-3xl text-misaTeal">
                {position?.title}
              </p>
              <div>
                {specificPositionCandidates?.map((candidate) => {
                  return (
                    <div
                      role="button"
                      className={`flex flex-row group ease-in duration-150 items-center mt-5 py-0 rounded-xl ${
                        voteState[positionNameInState] ===
                        candidate?.airtableRecordId
                          ? 'bg-[#2097A2] text-white border-[#2097A2]'
                          : 'text-misaTeal cursor-pointer hover:bg-[#D9E8EC] hover:border-[#D9E8EC]'
                      }`}
                      onKeyDown={() =>
                        handleChooseCandidate({
                          name: candidate?.name,
                          position: candidate?.position?.title,
                          airtableRecordId: candidate?.airtableRecordId,
                        })
                      }
                      tabIndex={0}
                      onClick={() =>
                        handleChooseCandidate({
                          name: candidate?.name,
                          position: candidate?.position?.title,
                          airtableRecordId: candidate?.airtableRecordId,
                        })
                      }
                    >
                      <img
                        src={candidate?.image?.file?.url}
                        alt="candidateImage"
                        className="absolute w-[135px] h-[135px] rounded-md rounded-r-none"
                      />

                      <div
                        className={`flex border-2 border-l-0 w-full h-[135px] rounded-xl ease-in duration-150 ${
                          voteState[positionNameInState] ===
                          candidate?.airtableRecordId
                            ? 'border-[#2097A2]'
                            : 'hover:border-[#D9E8EC]'
                        } `}
                      >
                        <p
                          className={`flex items-center pl-36 sm:pl-44 italic px-5 text-xl duration-150 ease-in`}
                        >
                          {candidate?.name}
                        </p>
                      </div>
                    </div>
                  )
                })}

                <div
                  className={`flex flex-row mt-5 items-centers group ease-in duration-150 border-solid border-2 rounded-xl ${
                    voteState[positionNameInState] ===
                    getAbstainRecordID(positionNameInState)
                      ? 'bg-[#2097A2] text-white border-[#2097A2]'
                      : 'border-[#D9E8EC] text-misaTeal cursor-pointer hover:bg-[#D9E8EC] hover:border-[#D9E8EC]'
                  }`}
                  onKeyDown={() =>
                    handleChooseCandidate({
                      name: 'Abstain',
                      position: position?.title,
                      airtableRecordId: getAbstainRecordID(positionNameInState),
                    })
                  }
                  onClick={() =>
                    handleChooseCandidate({
                      name: 'Abstain',
                      position: position?.title,
                      airtableRecordId: getAbstainRecordID(positionNameInState),
                    })
                  }
                  role="button"
                  tabIndex={0}
                >
                  <div
                    className={`flex items-center px-6 py-6 ease-in duration-150 w-[135px] h-[135px] justify-center rounded-lg rounded-r-none ${
                      voteState[positionNameInState] ===
                      getAbstainRecordID(positionNameInState)
                        ? 'bg-[#2097A2]'
                        : 'bg-[#D9E8EC]'
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faBan}
                      className="w-[60px] h-[60px] rounded-md"
                    />
                  </div>

                  <p
                    className={`flex items-center italic py-5 px-10 text-xl h-[135px] duration-150 ease-in ${
                      voteState[positionNameInState] ===
                      getAbstainRecordID(positionNameInState)
                        ? ''
                        : ''
                    } `}
                  >
                    Abstain
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </form>
      <div className="mt-10 text-center flex justify-center">
        <Button
          onClick={() =>
            voteDispatch({
              type: `SET_ACTIVE_TAB`,
              payload: 'Eligibility',
            })
          }
          className="mr-20 bg-white border-2 border-[#2097A2]"
          variant="secondary"
        >
          Back
        </Button>
        <Button
          onClick={() =>
            voteDispatch({
              type: `SET_ACTIVE_TAB`,
              payload: 'Submit',
            })
          }
          variant="primary"
          disabled={handleCheckIfComplete()}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default VotingFormTab

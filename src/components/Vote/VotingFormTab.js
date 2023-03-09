import React from 'react'

import Button from '../Elements/Button'

const VotingFormTab = ({ voteState, voteDispatch, positionsData }) => {
  let candidates = voteState?.candidatesData
  let requiredChoices = []
  for (let i = 0; i < positionsData?.length; i++) {
    let finalPositionTitle = positionsData[i]?.title
      .toLowerCase()
      .replaceAll(' ', '')
    requiredChoices.push(finalPositionTitle)
  }

  const handleCheckIfComplete = () => {
    let checker = false
    for (let i = 0; i < requiredChoices?.length; i++) {
      if (!voteState[requiredChoices[i]]) {
        checker = true
        break
      }
    }

    return checker
  }

  const handleChangeChoice = (event) => {
    if (event.target.value === 'Abstain') {
    } else {
      let chosenCandidate = candidates?.filter(
        (candidate) => candidate?.id === event.target.value
      )

      let chosenCandidatePosition = chosenCandidate[0]?.Position
      chosenCandidatePosition = chosenCandidatePosition
        .toUpperCase()
        .replaceAll(' ', '_')

      voteDispatch({
        type: `SET_${chosenCandidatePosition}_CHOICE`,
        payload: event.target.value,
      })
    }
  }

  const handleBackToPreviousTab = () => {
    voteDispatch({
      type: `SET_ACTIVE_TAB`,
      payload: 'Eligibility',
    })
  }

  const handleGoToNextTab = () => {
    voteDispatch({
      type: `SET_ACTIVE_TAB`,
      payload: 'Submit',
    })
  }

  return (
    <div>
      <h2 className="text-5xl text-center">Form: Vote</h2>
      <p className="my-4 text-center">
        Please fill each position in accordingly.
      </p>
      <form className="px-24">
        {positionsData.map((position) => {
          let specificPositionCandidates = candidates?.filter(
            (candidate) => candidate?.Position === position?.title
          )

          specificPositionCandidates.sort((a, b) => {
            return a?.['Order On Website'] - b?.['Order On Website']
          })

          if (position?.activeOnWebsite) {
            let finalPositionTitle = position?.title
              .toLowerCase()
              .replaceAll(' ', '')

            return (
              <div>
                <h1 className="text-3xl font-bold">{position?.title}</h1>
                <div onChange={handleChangeChoice}>
                  {specificPositionCandidates.map((specificCandidate) => {
                    return (
                      <div className="my-2">
                        <input
                          className="my-4"
                          type="radio"
                          value={`${specificCandidate?.id}`}
                          name={`${position?.title}`}
                          checked={
                            `${
                              finalPositionTitle === 'president'
                                ? voteState?.president
                                : finalPositionTitle ===
                                  'vicepresidentforeservices'
                                ? voteState?.vicepresidentforeservices
                                : null
                            }` === `${specificCandidate?.id}`
                          }
                          id={specificCandidate?.id}
                        />
                        <label for={specificCandidate?.id}>
                          {specificCandidate?.['Full Name']}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          }
        })}
      </form>
      <div className="text-center flex justify-center">
        <Button
          onClick={handleBackToPreviousTab}
          className="mr-8"
          variant="primary"
        >
          Back
        </Button>
        <Button
          onClick={handleGoToNextTab}
          variant="primary"
          disabled={handleCheckIfComplete()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default VotingFormTab

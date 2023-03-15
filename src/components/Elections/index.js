import React, { useState } from 'react'

import Layout from '../Layout'
import Button from '../Elements/Button'
import { StaticImage, GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import useElectionCandidates from './hooks/useContentfulElectionCandidates'
import useContentfulWebsitePages from '../../hooks/useContentfulWebsitePages'
import useContentfulElectionPositions from './hooks/useContentfulElectionPositions'

import FilterBar from '../Elements/FilterBar'

const Elections = () => {
  let electionPositions = useContentfulElectionPositions().sort((a, b) => {
    return a?.orderOnWebsite - b?.orderOnWebsite
  })

  const [selected, setSelected] = useState('All')
  let headers = ['All']
  for (let i = 0; i < electionPositions.length; i++) {
    headers.push(electionPositions[i].title)
  }

  let isVoteActive = useContentfulWebsitePages().filter((page) => {
    return page?.name === 'Vote'
  })[0]?.activeOnWebsite

  const candidates = useElectionCandidates().sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  let finalCandidatesList = []
  for (let i = 0; i < electionPositions?.length; i++) {
    let candidatesFiltered = candidates.filter((candidate) => {
      return candidate?.position?.title === electionPositions[i]?.title
    })

    for (let j = 0; j < candidatesFiltered?.length; j++) {
      finalCandidatesList.push(candidatesFiltered[j])
    }
  }

  let filteredData = finalCandidatesList.filter((candidate) => {
    return selected === 'All' ? true : candidate?.position?.title === selected
  })

  return (
    <Layout>
      <div className="bg-navbarBlack min-h-96 text-white p-8 pt-12 pb-24 md:p-16 relative overflow-hidden font-abc">
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold">
            <span className="text-misaTeal">MISA</span>lalan 2023
          </h1>
          <div className="grid gap-6 italic font-normal text-xl py-8 text-[#D9E8EC]">
            <p>
              We're excited to introduce the candidates for the Editorial Board
              election. These individuals have demonstrated their commitment to
              our community, and we're eager to see what they can bring to the
              table.
            </p>
            <p>
              Take some time to learn about each candidate's platform and vision
              for the future of our community. Your vote matters and can help
              shape the direction of our organization. Get ready to cast your
              vote and help us build a stronger and more vibrant community for
              all.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <a href="#howtovote">
              <Button variant={'primary'}>How to Vote?</Button>
            </a>
            <a href="#candidates">
              <Button
                className={`border-[1px] border-misaTeal text-misaTeal hover:bg-misaTeal hover:text-white`}
              >
                Check Candidates
              </Button>
            </a>
          </div>
        </div>
        <StaticImage
          quality={100}
          className={`max-w-[120px] md:max-w-[320px] lg:max-w-[460px] absolute bottom-0 right-0`}
          src="../../../static/images/ballothexagon.png"
        />
      </div>
      <div className="p-8 lg:p-12">
        <div className="bg-[#DCE7EB] rounded-xl h-full md:h-[80vh] p-8 md:p-12 md:pb-36 flex flex-col justify-around relative">
          <h2 className="text-misaTeal text-3xl sm:text-4xl md:text-5xl font-bold text-center">
            MISAlalan 2023 Timeline
          </h2>
          <ol class="border-misaTeal mt-8 md:mt-0 flex flex-col gap-8 sm:gap-16 md:grid md:grid-cols-[1fr_2fr_2fr_2fr_1fr] h-full border-l-[8px] md:h-auto md:gap-6 md:border-l-0 md:border-t-[16px] -mx-8 md:-mx-12 !w-full md:w-3/4 md:relative mb-12 sm:mb-0">
            <li className="hidden md:block">{/* adds empty space */}</li>
            <div className="relative md:text-center">
              <li className="md:absolute flex flex-col gap-4 md:gap-12 items-start md:items-center ml-8 md:ml-0 -top-7 right-0">
                <div class="absolute -left-2 md:relative h-[20px] w-[20px] md:h-[40px] md:w-[40px] rounded-full bg-misaAlternateTeal md:ml-0 md:mr-0"></div>
                <h4 class="text-xl font-bold md:absolute md:-top-20">
                  Application Deadline
                </h4>
                <p class="mt-2 border-[1px] border-misaTeal text-misaTeal px-2 rounded-lg uppercase italic">
                  Mar 8, 8PM
                </p>
              </li>
            </div>
            <div className="relative md:text-center">
              <li className="md:absolute flex flex-col gap-4 md:gap-12 items-start md:items-center ml-8 md:ml-0 -top-7 right-0">
                <div class="absolute -left-2 md:relative h-[20px] w-[20px] md:h-[40px] md:w-[40px] rounded-full bg-misaAlternateTeal md:ml-0 md:mr-0"></div>
                <h4 class="text-xl font-bold md:absolute md:-top-20">
                  Campaign Period
                </h4>
                <p class="mt-2 border-[1px] border-misaTeal text-misaTeal px-2 rounded-lg uppercase italic">
                  Mar 20 - 24
                </p>
              </li>
            </div>
            <div className="relative md:text-center">
              <li className="md:absolute flex flex-col gap-4 md:gap-12 items-start md:items-center ml-8 md:ml-0 -top-7 right-0">
                <div class="absolute -left-2 md:relative h-[20px] w-[20px] md:h-[40px] md:w-[40px] rounded-full bg-misaAlternateTeal md:ml-0 md:mr-0"></div>
                <h4 class="text-xl font-bold md:absolute md:-top-20">
                  Miting de Avance
                </h4>
                <p class="mt-2 border-[1px] border-misaTeal text-misaTeal px-2 rounded-lg uppercase italic">
                  Mar 29, 2PM
                </p>
              </li>
            </div>
            <div className="hidden md:block relative text-right flex-grow">
              <li className="md:absolute flex md:flex-col gap-4 md:gap-12 items-center md:items-end -top-7 -right-14">
                <StaticImage
                  className={`max-w-[64px] text-center`}
                  src="../../../static/images/bot-hand.png"
                />
                <h4 class="text-xl font-bold md:absolute md:-top-12">
                  Elections
                </h4>
                <StaticImage
                  className={`text-center bottom-0 md:bottom-auto absolute md:-right-14 lg:-right-20 w-[160px] lg:w-[200px]`}
                  src="../../../static/images/ballot-box.png"
                />
              </li>
            </div>
            <div className="relative md:hidden md:text-center">
              <li className="md:absolute flex flex-col gap-4 md:gap-12 items-start md:items-center ml-8 md:ml-0 -top-7 right-0">
                <div class="absolute -left-2 md:relative h-[20px] w-[20px] md:h-[40px] md:w-[40px] rounded-full bg-misaAlternateTeal md:ml-0 md:mr-0"></div>
                <h4 class="text-xl font-bold md:absolute md:-top-20">
                  Elections
                </h4>
                <p class="mt-2 border-[1px] border-misaTeal text-misaTeal px-2 rounded-lg uppercase italic">
                  Mar 31 - Apr 12
                </p>
              </li>
            </div>
          </ol>
          <div className="absolute bottom-0 md:bottom-32 lg:bottom-24 right-0 flex items-center gap-2 sm:gap-0">
            <p className="flex flex-col text-right font-bold">
              Results? <span className="text-misaTeal">soon.</span>
            </p>
            <div className="relative">
              <StaticImage
                quality={100}
                className={`max-w-[40px] sm:max-w-[80px] lg:max-w-[120px] text-center`}
                src="../../../static/images/misabot-side.png"
              />
            </div>
          </div>
        </div>
      </div>
      <div id="candidates" className="p-8">
        <h2 className="text-misaTeal text-4xl font-bold text-center pb-8">
          Candidates for Executive Board
        </h2>

        <FilterBar
          options={headers}
          setSelected={setSelected}
          selected={selected}
        />

        <div className="grid md:grid-cols-2 gap-8">
          {filteredData.map((candidate, index) => {
            const { image, name, position } = candidate
            const slug = name
              .replace(/([a-z])([A-Z])/g, '$1-$2')
              .replace(/[\s_]+/g, '-')
              .toLowerCase()

            return (
              <div
                className="border-4 border-misaTeal rounded-3xl grid md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_3fr] relative overflow-hidden"
                key={index}
              >
                <div className="relative h-96 md:h-auto">
                  <img
                    src={image ? image.file.url : null}
                    className={`text-center h-full w-full object-cover object-top`}
                  />
                </div>
                <div className="flex flex-col p-8 gap-8 justify-between">
                  <div>
                    <h3 className="font-bold text-2xl text-misaTeal">{name}</h3>
                    <span className="italic">{position?.title}</span>
                  </div>
                  <Link to={`/elections/${slug}`}>
                    <Button
                      className={`border-[1px] border-misaTeal text-misaTeal hover:bg-misaTeal hover:text-white`}
                    >
                      View Platform
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div
        id="howtovote"
        className="bg-misaTeal py-12 px-8 relative overflow-hidden"
      >
        <div className="text-white text-center pb-8">
          <h2 className="text-4xl font-bold">Ready to Vote?</h2>
          <span className="font-normal text-xl italic">
            Follow these three steps to participate in the MISAlalan 2023!
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-0 items-center justify-center px-8 md:px-4 lg:px-16">
          <div className="grid text-center items-center justify-center justify-items-center text-white w-96 gap-2 md:gap-8 md:h-48">
            <p className="text-4xl font-bold">1</p>
            <StaticImage
              quality={100}
              className={`max-w-[60px] md:max-w-[100px] text-center`}
              src="../../../static/images/id-icon.png"
            />
            <p className="font-normal text-xl italic">
              Prepare ID Number Check Eligibility
            </p>
          </div>
          <hr className="w-48 border-4 -mx-16 hidden md:block" />
          <div className="grid text-center items-center justify-center justify-items-center text-white w-96 gap-2 md:gap-8 md:h-48">
            <p className="text-4xl font-bold">2</p>
            <StaticImage
              quality={100}
              className={`max-w-[60px] md:max-w-[100px] text-center`}
              src="../../../static/images/vote-icon.png"
            />
            <p className="font-normal text-xl  italic">
              Vote for favored candidate
            </p>
          </div>
          <hr className="w-48 border-4 -mx-16 hidden md:block" />
          <div className="grid text-center items-center justify-center justify-items-center text-white w-96 gap-2 md:gap-8 md:h-48">
            <p className="text-4xl font-bold">3</p>
            <StaticImage
              quality={100}
              className={`max-w-[60px] md:max-w-[100px] text-center`}
              src="../../../static/images/ballot-icon.png"
            />
            <p className="font-normal text-xl italic">Submit Ballot</p>
          </div>
          <StaticImage
            quality={100}
            className={`max-w-[200px] lg:max-w-[320px] absolute -bottom-16 -right-8 opacity-30 md:opacity-100`}
            src="../../../static/images/eventshexagons.png"
          />
        </div>
        <div className="text-center py-4 pt-16">
          <Button disabled={isVoteActive ? false : true} variant={'secondary'}>
            {isVoteActive ? `Check Eligibility` : 'Coming soon!'}
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default Elections

import React from 'react'

import Layout from '../Layout'
import Button from '../Elements/Button'
import { StaticImage, GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import useElectionCandidates from './hooks/useContentfulElectionCandidates'

const Elections = () => {
  const candidates = useElectionCandidates()

  return (
    <Layout>
      <div className="bg-navbarBlack h-96 text-white p-16">
        <div className="w-1/2">
          <h1 className="text-4xl font-bold">
            <span className="text-misaTeal">MISA</span>lalan 2023
          </h1>
          <div className="grid gap-6 italic font-thin py-8">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              tempor pellentesque semper. Vivamus in ipsum ac nulla viverra
              tincidunt. Etiam non vestibulum justo, ac euismod nunc.{' '}
            </p>
            <p>
              Nulla tempor aliquam massa, ac interdum nulla dignissim eget.
              Mauris a arcu nec metus sagittis congue feugiat ut nisl
            </p>
          </div>
          <div className="flex gap-6">
            <Button variant={'primary'}>How to Vote?</Button>
            <Button variant={'secondary'}>Check Candidates</Button>
          </div>
        </div>
      </div>
      <div className="p-12">
        <div className="bg-[#DCE7EB] rounded-xl h-[60vh] p-12 pb-36 flex flex-col justify-around relative">
          <h2 className="text-misaTeal text-5xl font-bold text-center">
            MISAlalan 2023 Timeline
          </h2>
          <ol class="border-l border-misaTeal grid grid-cols-[1fr_2fr_2fr_2fr_1fr] md:gap-6 md:border-l-0 md:border-t-[16px] -mx-12 w-3/4 relative">
            <li>{/* adds empty space */}</li>
            <div className="relative text-center">
              <li className="absolute flex flex-col gap-12 items-center -top-7 right-0">
                <div class="h-[40px] w-[40px] rounded-full bg-misaAlternateTeal md:ml-0 md:mr-0"></div>
                <h4 class="text-xl font-bold absolute -top-20">
                  Application Deadline
                </h4>
                <p class="mt-2 border-[1px] border-misaTeal text-misaTeal px-2 rounded-lg uppercase italic">
                  Mar 8, 8PM
                </p>
              </li>
            </div>
            <div className="relative text-center">
              <li className="absolute flex flex-col gap-12 items-center -top-7 right-0">
                <div class="h-[40px] w-[40px] rounded-full bg-misaAlternateTeal md:ml-0 md:mr-0"></div>
                <h4 class="text-xl font-bold absolute -top-20">
                  Campaign Period
                </h4>
                <p class="mt-2 border-[1px] border-misaTeal text-misaTeal px-2 rounded-lg uppercase italic">
                  Mar 20 - 24
                </p>
              </li>
            </div>
            <div className="relative text-center">
              <li className="absolute flex flex-col gap-12 items-center -top-7 right-0">
                <div class="h-[40px] w-[40px] rounded-full bg-misaAlternateTeal md:ml-0 md:mr-0"></div>
                <h4 class="text-xl font-bold absolute -top-20">
                  Miting de Avance
                </h4>
                <p class="mt-2 border-[1px] border-misaTeal text-misaTeal px-2 rounded-lg uppercase italic">
                  Mar 29, 2PM
                </p>
              </li>
            </div>
            <div className="relative text-right">
              <li className="absolute flex flex-col gap-12 items-end -top-7 -right-14">
                <StaticImage
                  className={`max-w-[64px] text-center`}
                  src="../../../static/images/bot-hand.png"
                />
                <h4 class="text-xl font-bold absolute -top-12">Elections</h4>
                <StaticImage
                  className={`text-center absolute -right-24 w-[240px]`}
                  src="../../../static/images/ballot-box.png"
                />
              </li>
            </div>
          </ol>
          <div className="absolute bottom-24 right-0 flex items-center">
            <p className="flex flex-col text-right font-bold">
              Results? <span className="text-misaTeal">soon.</span>
            </p>
            <div className="relative">
              <StaticImage
                quality={100}
                className={`max-w-[120px] max-h-[120x] text-center`}
                src="../../../static/images/misabot-side.png"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <h2 className="text-misaTeal text-4xl font-bold text-center pb-8">
          Candidates for Executive Board
        </h2>
        <div className="grid grid-cols-2 gap-8">
          {candidates.map((candidate, index) => {
            const { image, name, position } = candidate
            const slug = name
              .replace(/([a-z])([A-Z])/g, '$1-$2')
              .replace(/[\s_]+/g, '-')
              .toLowerCase()

            return (
              <div
                className="border-4 border-misaTeal rounded-3xl grid grid-cols-[1fr_3fr] relative overflow-hidden"
                key={index}
              >
                <div className="relative">
                  <GatsbyImage
                    className={`text-center h-full w-full object-cover`}
                    image={image.gatsbyImage}
                  />
                </div>
                <div className="flex flex-col p-8 gap-8 justify-between">
                  <div className="text-misaTeal">
                    <h3 className="font-bold text-2xl">{name}</h3>
                    <span className="italic font-thin">{position}</span>
                  </div>
                  <Link to={`/elections/${slug}`}>
                    <Button variant={'secondary'}>View Platform</Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="bg-misaTeal py-12">
        <div className="text-white text-center pb-8">
          <h2 className="text-4xl font-bold">Ready to Vote?</h2>
          <span className="font-thin italic">
            Follow these three steps to participate in the MISAlalan 2023!
          </span>
        </div>
        <div className="flex items-center justify-center px-64">
          <div className="grid text-center items-center justify-center justify-items-center text-white w-96 gap-8 h-48">
            <p className="text-4xl font-bold">1</p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block w-20 h-20"
            >
              <path
                d="M7 8C7 7.44772 7.44772 7 8 7H16C16.5523 7 17 7.44772 17 8C17 8.55228 16.5523 9 16 9H8C7.44772 9 7 8.55228 7 8Z"
                fill="currentColor"
              />
              <path
                d="M12 16C13.1046 16 14 15.1046 14 14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14C10 15.1046 10.8954 16 12 16Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6ZM18 5H6C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5Z"
                fill="currentColor"
              />
            </svg>
            <p className="font-thin italic">
              Prepare ID Number Check Eligibility
            </p>
          </div>
          <hr className="w-96 border-4 -mx-16" />
          <div className="grid text-center items-center justify-center justify-items-center text-white w-96 gap-8 h-48">
            <p className="text-4xl font-bold">2</p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block w-20 h-20"
            >
              <path
                d="M7 8C7 7.44772 7.44772 7 8 7H16C16.5523 7 17 7.44772 17 8C17 8.55228 16.5523 9 16 9H8C7.44772 9 7 8.55228 7 8Z"
                fill="currentColor"
              />
              <path
                d="M12 16C13.1046 16 14 15.1046 14 14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14C10 15.1046 10.8954 16 12 16Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6ZM18 5H6C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5Z"
                fill="currentColor"
              />
            </svg>
            <p className="font-thin italic">Vote for favored candidate</p>
          </div>
          <hr className="w-96 border-4 -mx-16" />
          <div className="grid text-center items-center justify-center justify-items-center text-white w-96 gap-8 h-48">
            <p className="text-4xl font-bold">3</p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block w-20 h-20"
            >
              <path
                d="M7 8C7 7.44772 7.44772 7 8 7H16C16.5523 7 17 7.44772 17 8C17 8.55228 16.5523 9 16 9H8C7.44772 9 7 8.55228 7 8Z"
                fill="currentColor"
              />
              <path
                d="M12 16C13.1046 16 14 15.1046 14 14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14C10 15.1046 10.8954 16 12 16Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6ZM18 5H6C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5Z"
                fill="currentColor"
              />
            </svg>
            <p className="font-thin italic">Submit Ballot</p>
          </div>
        </div>
        <div className="text-center py-4 pt-16">
          <Button variant={'secondary'}>Check Eligibility</Button>
        </div>
      </div>
    </Layout>
  )
}

export default Elections

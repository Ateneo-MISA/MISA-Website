import React from 'react'

import Button from '../Elements/Button'
import { StaticImage, GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import useElectionCandidates from './hooks/useContentfulElectionCandidates'

const Elections = () => {
  const candidates = useElectionCandidates()

  return (
    <>
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
        <div className="bg-[#DCE7EB] rounded-xl h-[60vh] p-12 flex flex-col justify-around relative">
          <h2 className="text-misaTeal text-4xl font-bold text-center">
            MISAlalan 2023 Timeline
          </h2>
          <ol class="border-l border-misaTeal md:flex md:justify-center md:gap-6 md:border-l-0 md:border-t-[16px] -mx-12 w-3/4">
            <li>
              <div class="w-48"></div>
            </li>
            <li>
              <div class="flex-start flex items-center pt-2 md:block md:pt-0">
                <div class="-ml-[5px] mr-3 h-[40px] w-[40px] rounded-full bg-misaAlternateTeal md:ml-0 md:mr-0 md:-mt-[28px]"></div>
                <p class="mt-2 text-sm text-misaTeal">01.07.2021</p>
              </div>
              <div class="mt-2 ml-4 pb-5 md:ml-0">
                <h4 class="mb-1.5 text-xl font-semibold">Title of section 1</h4>
              </div>
            </li>
            <li>
              <div class="flex-start flex items-center pt-2 md:block md:pt-0">
                <div class="-ml-[5px] mr-3 h-[40px] w-[40px] rounded-full bg-misaAlternateTeal md:ml-0 md:mr-0 md:-mt-[28px]"></div>
                <p class="mt-2 text-sm text-misaTeal">13.09.2021</p>
              </div>
              <div class="mt-2 ml-4 pb-5 md:ml-0">
                <h4 class="mb-1.5 text-xl font-semibold">Title of section 2</h4>
              </div>
            </li>
            <li>
              <div class="flex-start flex items-center pt-2 md:block md:pt-0">
                <div class="-ml-[5px] mr-3 h-[40px] w-[40px] rounded-full bg-misaAlternateTeal md:ml-0 md:mr-0 md:-mt-[28px]"></div>
                <p class="mt-2 text-sm text-misaTeal">25.11.2021</p>
              </div>
              <div class="mt-2 ml-4 pb-5 md:ml-0">
                <h4 class="mb-1.5 text-xl font-semibold">Title of section 3</h4>
              </div>
            </li>
          </ol>
          <div className="absolute right-0 flex items-center">
            <p className="flex flex-col text-right font-bold">
              Results? <span className="text-misaTeal">soon.</span>
            </p>
            <StaticImage
              quality={100}
              className={`max-w-[120px] max-h-[120x] text-center`}
              src="../../../static/images/misabot-side.png"
            />
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
                <div className="flex flex-col p-8 justify-between">
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
    </>
  )
}

export default Elections

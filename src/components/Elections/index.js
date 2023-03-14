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
      <div className="bg-navbarBlack h-96 text-white p-16 relative overflow-hidden">
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
        <StaticImage
          quality={100}
          className={`max-w-[460px] absolute bottom-0 right-0`}
          src="../../../static/images/ballothexagon.png"
        />
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
                className={`max-w-[120px] text-center`}
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
                  <img
                    src={image.file.url}
                    className={`text-center h-full w-full object-cover`}
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
      <div className="bg-misaTeal py-12 relative overflow-hidden">
        <div className="text-white text-center pb-8">
          <h2 className="text-4xl font-bold">Ready to Vote?</h2>
          <span className="font-thin italic">
            Follow these three steps to participate in the MISAlalan 2023!
          </span>
        </div>
        <div className="flex items-center justify-center px-40">
          <div className="grid text-center items-center justify-center justify-items-center text-white w-96 gap-8 h-48">
            <p className="text-4xl font-bold">1</p>
            <StaticImage
              quality={100}
              className={`max-w-[100px] text-center`}
              src="../../../static/images/id-icon.png"
            />
            <p className="font-thin italic">
              Prepare ID Number Check Eligibility
            </p>
          </div>
          <hr className="w-48 border-4 -mx-16" />
          <div className="grid text-center items-center justify-center justify-items-center text-white w-96 gap-8 h-48">
            <p className="text-4xl font-bold">2</p>
            <StaticImage
              quality={100}
              className={`max-w-[100px] text-center`}
              src="../../../static/images/vote-icon.png"
            />
            <p className="font-thin italic">Vote for favored candidate</p>
          </div>
          <hr className="w-48 border-4 -mx-16" />
          <div className="grid text-center items-center justify-center justify-items-center text-white w-96 gap-8 h-48">
            <p className="text-4xl font-bold">3</p>
            <StaticImage
              quality={100}
              className={`max-w-[100px] text-center`}
              src="../../../static/images/ballot-icon.png"
            />
            <p className="font-thin italic">Submit Ballot</p>
          </div>
          <StaticImage
            quality={100}
            className={`max-w-[320px] absolute -bottom-16 -right-8`}
            src="../../../static/images/eventshexagons.png"
          />
        </div>
        <div className="text-center py-4 pt-16">
          <Button variant={'secondary'}>Check Eligibility</Button>
        </div>
      </div>
    </Layout>
  )
}

export default Elections

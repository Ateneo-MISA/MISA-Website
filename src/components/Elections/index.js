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
      <div className="bg-navbarBlack min-h-96 text-white p-8 pt-12 pb-24 md:p-16 relative overflow-hidden">
        <div className="md:w-2/3">
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
          <div className="flex flex-col md:flex-row gap-6">
            <Button variant={'primary'}>How to Vote?</Button>
            <Button
              className={`border-[1px] border-misaTeal text-misaTeal hover:bg-misaTeal hover:text-white`}
            >
              Check Candidates
            </Button>
          </div>
        </div>
        <StaticImage
          quality={100}
          className={`max-w-[120px] md:max-w-[320px] lg:max-w-[460px] absolute bottom-0 right-0`}
          src="../../../static/images/ballothexagon.png"
        />
      </div>
      <div className="p-8 lg:p-12">
        <div className="bg-[#DCE7EB] rounded-xl h-[90vh] md:h-[80vh] p-8 md:p-12 md:pb-36 flex flex-col justify-around relative">
          <h2 className="text-misaTeal text-3xl sm:text-4xl md:text-5xl font-bold text-center">
            MISAlalan 2023 Timeline
          </h2>
          <ol class="border-misaTeal mt-8 md:mt-0 flex flex-col gap-8 sm:gap-16 md:grid md:grid-cols-[1fr_2fr_2fr_2fr_1fr] h-full border-l-[8px] md:h-auto md:gap-6 md:border-l-0 md:border-t-[16px] -mx-8 md:-mx-12 !w-full md:w-3/4 md:relative">
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
            <div className="relative text-right flex-grow">
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
      <div className="p-8">
        <h2 className="text-misaTeal text-4xl font-bold text-center pb-8">
          Candidates for Executive Board
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {candidates.map((candidate, index) => {
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
                    src={image.file.url}
                    className={`text-center h-full w-full object-cover object-top`}
                  />
                </div>
                <div className="flex flex-col p-8 gap-8 justify-between">
                  <div className="text-misaTeal">
                    <h3 className="font-bold text-2xl">{name}</h3>
                    <span className="italic font-thin">{position}</span>
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
      <div className="bg-misaTeal py-12 px-8 relative overflow-hidden">
        <div className="text-white text-center pb-8">
          <h2 className="text-4xl font-bold">Ready to Vote?</h2>
          <span className="font-thin italic">
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
            <p className="font-thin italic">
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
            <p className="font-thin italic">Vote for favored candidate</p>
          </div>
          <hr className="w-48 border-4 -mx-16 hidden md:block" />
          <div className="grid text-center items-center justify-center justify-items-center text-white w-96 gap-2 md:gap-8 md:h-48">
            <p className="text-4xl font-bold">3</p>
            <StaticImage
              quality={100}
              className={`max-w-[60px] md:max-w-[100px] text-center`}
              src="../../../static/images/ballot-icon.png"
            />
            <p className="font-thin italic">Submit Ballot</p>
          </div>
          <StaticImage
            quality={100}
            className={`max-w-[200px] lg:max-w-[320px] absolute -bottom-16 -right-8 opacity-30 md:opacity-100`}
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

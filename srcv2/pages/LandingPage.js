import React from 'react'

import GitHubButton from '../components/GitHubButton'
import Section from '../components/Section'

import { HERO_IMAGE_URL } from '../constants'

const LandingPage = () => {

    const renderFeatures = () => {
        const FEATURES = [
            {
                title: 'Project Administration',
                goals: ['Create projects from any Github repo', 'View insights for a project'],
                imageUrl: 'https://project-trinary.s3.us-east-1.amazonaws.com/images/iphone-landing-mockup.png',
                imageHeight: 'h-'
            },
            {
                title: 'Budgeting',
                goals: ['Allocate funds to your team', 'Negotiate compensation rates', 'Fund allocations with BTC'],
                imageUrl: 'https://project-trinary.s3.us-east-1.amazonaws.com/images/budget-landing-mockup.png'
            },
            {
                title: 'Bitcoin Bonuses',
                goals: [],
                imageUrl: 'https://project-trinary.s3.us-east-1.amazonaws.com/images/btc-landing-mockup.png'
            }
        ]
        return FEATURES.map((feature, idx) => {
            const goals = feature.goals.map(goal => {
                return (
                    <p className='goal text-center font-bold text-xl text-grey'>
                        {goal}
                    </p>
                )
            })
            return (
                <div className='feature justify-center grid grid grid-cols-1 gap-4'>
                    <div className='rounded-full bg-setlife w-fit px-2 mx-auto'>
                        <p className='text-white p-2 text-lg font-bold'>
                            {idx + 1}
                        </p>
                    </div>
                    <p className='title text-3xl text-center font-bold'>
                        {feature.title}
                    </p>
                    {goals}
                    <div className='h-auto m-auto max-h-80'>
                        <img src={feature.imageUrl} alt={feature.title} className='h-fit max-h-80' />
                    </div>
                </div>
            )
        })
    }

    return (
        <div className='LandingPage'>
            <Section backgroundColor={'bg-light'} className={'rounded-b-[70px]'}>
                <div className='header grid grid-flow-row auto-rows-max gap-8'>
                    <div className='grid grid-cols-1 gap-8'>
                        <p className='text-5xl text-center font-bold'>
                            Trinary
                        </p>
                        <p className='text-grey text-2xl text-center font-bold'>
                            Build a “micro-economy” for your team to share knowledge, trade feedback, & hold each other accountable
                        </p>
                    </div>
                    <div className='grid grid-cols-1'>
                        <img src={HERO_IMAGE_URL} alt='landing' className=' lg:mt-8 mx-auto' />
                    </div>
                </div>
            </Section>
            <Section className='flex justify-center'>
                <div className='w-full'>
                    <GitHubButton text={'Continue with GitHub'} />
                </div>
            </Section>
            <Section>
                <div className='features grid grid-flow-row auto-rows-max gap-12'>
                    { renderFeatures() }
                </div>
            </Section>
        </div>
    )
}

export default LandingPage
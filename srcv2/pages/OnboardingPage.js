import React from 'react'
import { useHistory } from 'react-router-dom'

import Section from '../components/Section'

const OnboardingPage = () => {

    const history = useHistory()

    return (
        <div className='OnboardingPage'>
            <Section backgroundColor={'bg-light'} className={'rounded-b-[70px]'}>
                <div className='header grid grid-flow-row auto-rows-max gap-8'>
                    <div className='grid grid-cols-1 gap-8'>
                        <p className='text-4xl font-bold'>
                            Choose one option
                        </p>
                        <p className='text-xl'>
                            Create your own project from an existing Github repo or explore public projects to fund yourself
                        </p>
                    </div>
                    <div className='grid grid-cols-1'>
                        <img src='https://project-trinary.s3.us-east-1.amazonaws.com/images/onboarding-hero.png' alt='onboarding' className=' lg:mt-8 mx-auto' />
                    </div>
                </div>
            </Section>
            <Section>
                <div className='grid grid-cols-1 gap-4 pb-12'>
                    <p className='text-center' onClick={() => history.push('/dashboard')}>
                        Skip
                    </p>
                    <button
                        className='bg-black rounded-full w-full text-white py-2'
                        onClick={() => history.push('/onboarding-investor')}
                        type='button'
                    >
                        I want to fund
                    </button>
                    <button
                        className='bg-setlife rounded-full w-full py-2'
                        onClick={() => history.push('/onboarding-contributor')}
                        type='button'
                    >
                        Create new project
                    </button>
                </div>
            </Section>
        </div>
    )
}

export default OnboardingPage
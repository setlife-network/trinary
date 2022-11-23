import React from 'react'
import { useHistory, Link } from 'react-router-dom'

import Section from '../components/Section'

const OnboardingPage = () => {

    const history = useHistory()

    const fundingPrototypeLink = 'https://www.figma.com/proto/qgGWXmprU7vTv7guzWzvML/Project-Trinary?node-id=4554%3A16170&scaling=scale-down&page-id=4076%3A12706&starting-point-node-id=4554%3A16170&show-proto-sidebar=1'

    return (
        <div className='OnboardingPage'>
            <Section backgroundColor={'bg-white-light'} className={'rounded-b-[70px]'}>
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
                        <img src='https://project-trinary.s3.us-east-1.amazonaws.com/images/onboarding-hero.png' alt='onboarding' className=' lg:mt-8 mx-auto max-h-96' />
                    </div>
                </div>
            </Section>
            <Section className='absolute w-full bottom-0'>
                <div className='grid grid-cols-1 gap-4 pb-2'>
                    <p className='text-center' onClick={() => history.push('/dashboard')}>
                        Skip
                    </p>
                    <button
                        className='bg-black rounded-full w-full text-white py-2'
                        onClick={() => window.open(fundingPrototypeLink, '_blank')}
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
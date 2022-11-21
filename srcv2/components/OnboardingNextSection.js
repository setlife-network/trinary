import React from 'react'

import Section from './Section'

const OnboardingNextSection = (props) => {
    const {
        goToNextSection
    } = props

    return (
        <Section className='absolute bottom-4 w-full'>
            <div className='grid grid-cols-1 gap-4'>
                <p className='text-center' onClick={() => history.push('/dashboard')}>
                    Skip
                </p>
                <button
                    className='bg-setlife rounded-full w-full py-2'
                    onClick={() => goToNextSection()}
                    type='button'
                >
                    Continue
                </button>
            </div>
        </Section>
    )
}

export default OnboardingNextSection         
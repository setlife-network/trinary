import React from 'react'

import Section from './Section'
import OnboardingNextSection from './OnboardingNextSection'

import {
    BUDGETING_IMAGE_URL
} from '../constants'

const BudgetingOnboarding = (props) => {

    const { 
        goToNextSection
    } = props

    return (
        <div className='BudgetingOnboarding'>
            <Section backgroundColor={'bg-white-light'} className={'rounded-br-[70px] pb-0 px-0'}>
                <div className='header grid grid-flow-row auto-rows-max'>
                    <div className='rounded-full bg-setlife w-fit px-2 mx-auto mb-4'>
                        <p className='text-white p-2 text-lg font-bold'>
                            2
                        </p>
                    </div>
                    <div className='grid grid-cols-1 gap-2'>
                        <p className='text-3xl text-center font-bold'>
                            Budgeting
                        </p>
                        <p className='text-gray text-xl text-center font-bold'>
                            Allocate funds to your team
                        </p>
                        <p className='text-gray text-xl text-center font-bold'>
                            Negotiate compensation rates
                        </p>
                    </div>
                    <div className='grid grid-cols-1'>
                        <img src={BUDGETING_IMAGE_URL} alt='budget' className=' lg:mt-8 mx-auto' />
                    </div>
                </div>
            </Section>
            <OnboardingNextSection goToNextSection={goToNextSection} />
        </div>
    )
}

export default BudgetingOnboarding
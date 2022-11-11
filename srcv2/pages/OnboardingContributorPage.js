import React, { useEffect, useState } from 'react'

import BudgetingOnboarding from '../components/BudgetingOnboarding'
import CreateProjectOnboarding from '../components/CreateProjectOnboarding'
import ProjectAdministrationOnboarding from '../components/ProjectAdministrationOnboarding'
import Section from '../components/Section'

const OnboardingContributorPage = () => {

    const sections = [<ProjectAdministrationOnboarding/>, <BudgetingOnboarding/>, <CreateProjectOnboarding/>, <div>Fund</div>]
    
    const [currentSectionIdx, setCurrentSectionIdx] = useState(0)

    const renderCurrentSection = () => {
        return (sections[currentSectionIdx])
    }

    return (
        <div className='OnboardingContributorPage'>
            {renderCurrentSection()}
            <Section className='absolute bottom-4 w-full'>
                <div className='grid grid-cols-1 gap-4'>
                    <p className='text-center' onClick={() => history.push('/dashboard')}>
                        Skip
                    </p>
                    <button
                        className='bg-setlife rounded-full w-full py-2'
                        onClick={() => setCurrentSectionIdx(currentSectionIdx + 1)}
                        type='button'
                    >
                        Continue
                    </button>
                </div>
            </Section>
        </div>
    )
}

export default OnboardingContributorPage
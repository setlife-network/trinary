import React, { useEffect, useState } from 'react'

import BudgetingOnboarding from '../components/BudgetingOnboarding'
import CreateProjectOnboarding from '../components/CreateProjectOnboarding'
import ProjectAdministrationOnboarding from '../components/ProjectAdministrationOnboarding'
import Section from '../components/Section'

const OnboardingContributorPage = () => {
    
    const [currentSectionIdx, setCurrentSectionIdx] = useState(0)

    const goToNextSection = () => {
        setCurrentSectionIdx(currentSectionIdx + 1)
    }

    const sections = [
        <ProjectAdministrationOnboarding
            goToNextSection={goToNextSection}
        />, 
        <BudgetingOnboarding
            goToNextSection={goToNextSection}
        />,
        <CreateProjectOnboarding
            goToNextSection={goToNextSection}
        />, 
        <div>Fund</div>
    ]

    const renderCurrentSection = () => {
        return (sections[currentSectionIdx])
    }

    return (
        <div className='OnboardingContributorPage'>
            {renderCurrentSection()}
        </div>
    )
}

export default OnboardingContributorPage
import React, { useEffect, useState } from 'react'

import BudgetingOnboarding from '../components/BudgetingOnboarding'
import CreateProjectOnboarding from '../components/CreateProjectOnboarding'
import PlanFundingOnboarding from '../components/PlanFundingOnboarding'
import ProjectAdministrationOnboarding from '../components/ProjectAdministrationOnboarding'
import Section from '../components/Section'

const OnboardingContributorPage = () => {
    
    const [currentSectionIdx, setCurrentSectionIdx] = useState(0)
    const [projectCreated, setProjectCreated] = useState(null)

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
            setProjectCreated={setProjectCreated}
        />,
        <PlanFundingOnboarding
            goToNextSection={goToNextSection}
            project={projectCreated}
        />
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
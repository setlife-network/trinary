import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import CreateProjectFunding from './CreateProjectFunding'
import OnboardingNextSection from './OnboardingNextSection'
import Section from './Section'

import { CURRENCIES } from '../constants'

import { UPDATE_PROJECT } from '../operations/mutations/ProjectMutations'

const FUNDING_PLAN_TIMEFRAME_AMOUNTS = ['Monthly amount', 'Total amount', 'Quarterly']

const PlanFundingOnboarding = (props) => {

    const {
        project
    } = props

    const history = useHistory()

    const [budgetRange, setBudgetRange] = useState(null)
    const [currency, setCurrency] = useState(CURRENCIES[0])
    const [timeframeAmount, setTimeFrameAmount] = useState(FUNDING_PLAN_TIMEFRAME_AMOUNTS[0])

    const [
        addProjectFunding,
        {
            data,
            loading,
            error
        }
    ] = useMutation(UPDATE_PROJECT, {
        errorPolicy: 'all'
    })

    const saveAndGoToNextSection = async () => {
        try {
            const fundProjectVariables = {
                project_id: project.data.createProject.id,
                expected_budget: budgetRange,
                expected_budget_timeframe: timeframeAmount,
                expected_budget_currency: currency.name
            }
            await addProjectFunding({ 
                variables: fundProjectVariables
            })
            history.push('/dashboard')
        } catch (err) {
            console.log('err')
            console.log(err)
        }
        return true
    }

    return (
        <div>
            <Section>
                <div className='grid grid-cols-1 gap-2'>
                    <p className='text-3xl text-center font-bold'>
                        Plan funding
                    </p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                    </p>
                </div>
            </Section>
            <CreateProjectFunding
                budgetRange={budgetRange}
                currency={currency}
                timeframeAmount={timeframeAmount}
                setBudgetRange={setBudgetRange}
                setCurrency={setCurrency}
                setTimeFrameAmount={setTimeFrameAmount}
            />
            <OnboardingNextSection goToNextSection={saveAndGoToNextSection} />
        </div>
    )
}

export default PlanFundingOnboarding
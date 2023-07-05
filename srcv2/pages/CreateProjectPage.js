import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import {
    Snackbar
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

import CreateProject from '../components/CreateProject'
import CreateProjectFunding from '../components/CreateProjectFunding'
import Section from '../components/Section'

import { ADD_PROJECT, UPDATE_PROJECT } from '../operations/mutations/ProjectMutations'
import { CREATE_PERMISSION } from '../operations/mutations/PermissionMutations'

import { sessionUser } from '../reactivities/variables'

import { CURRENCIES, FUNDING_PLAN_TIMEFRAME_AMOUNTS } from '../constants'

const CreateProjectPage = () => {

    const [currentProjectCreationPhase, setCurrentProjectCreationPhase] = useState(0)
    const [selectedUser, setSelectedUser] = useState(null)
    const [selectedRepo, setSelectedRepo] = useState(null)
    const [budgetRange, setBudgetRange] = useState(null)
    const [currency, setCurrency] = useState(CURRENCIES[0])
    const [timeframeAmount, setTimeFrameAmount] = useState(FUNDING_PLAN_TIMEFRAME_AMOUNTS[0])
    const [newProject, setNewProject] = useState()
    const [errorMessage, setErrorMessage] = useState('')

    const history = useHistory()

    const [
        addProject,
        {
            data: addProjectData,
            loading: loadingAddProject,
            error: errorProjectData
        }
    ] = useMutation(ADD_PROJECT, {
        errorPolicy: 'all'
    })

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

    const [
        createPermission,
        {
            data: dataNewPermission,
            loading: loadingNewPermission,
            error: errorNewPermission
        }
    ] = useMutation(CREATE_PERMISSION, {
        errorPolicy: 'all'
    })

    const createProject = async () => {
        const newProjectVariables = {
            name: selectedRepo.name,
            github_url: selectedRepo.githubUrl,
            is_public: !selectedRepo.private
        }
        const newProject = await addProject({ variables: newProjectVariables })
        if (newProject.errors) {
            if (newProject.errors[0] && newProject.errors[0].message) {
                throw new Error(newProject.errors[0].message)
            }
            throw new Error('An error ocurred while creating the project')
        }
        const newPermission = await createPermission({
            variables: {
                contributor_id: sessionUser().id,
                project_id: newProject.data.createProject.id,
                type: 'owner'
            } 
        })
        if (loadingAddProject) return (<p>Loading</p>)
        if (newProject.errors) {
            console.log(`${Object.keys(newProject.errors[0].extensions.exception.fields)[0]} already exists`)
        } else {
            const newPermission = await createPermission({
                variables: {
                    contributor_id: sessionUser().id,
                    project_id: newProject.data.createProject.id,
                    type: 'owner'
                }
            })
        }
        return newProject
    }

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setErrorMessage('')
    }

    const saveAndContinue = async () => {
        try {
            const newProject = await createProject()
            setNewProject(newProject.data.createProject)
            setCurrentProjectCreationPhase(currentProjectCreationPhase + 1)
        } catch (err) {
            
            console.log(err)
            setErrorMessage(`${err}`)
        }
    }

    const saveProjectFunding = async () => {
        try {
            const fundProjectVariables = {
                project_id: newProject.id,
                expected_budget: budgetRange,
                expected_budget_timeframe: timeframeAmount,
                expected_budget_currency: currency.name
            }
            await addProjectFunding({ 
                variables: fundProjectVariables
            })
            history.push('/dashboard')
            history.go(0)
        } catch (err) {
            
            console.log(err)
            setErrorMessage(`${err}`)
        }
    }

    return (
        <div className='CreateProjectPage'>
            <Section>
                <div className='grid grid-cols-1 gap-2'>
                    <p className='text-3xl text-center font-bold'>
                        Create a project
                    </p>
                </div>
            </Section>
            {!currentProjectCreationPhase &&
                <>
                    <CreateProject
                        selectedUser={selectedUser}
                        selectedRepo={selectedRepo}
                        setSelectedUser={setSelectedUser}
                        setSelectedRepo={setSelectedRepo}
                    />
                    <Section>
                        <div className='grid absolute bottom-20 left-16 right-16 gap-2'>
                            <button
                                className='w-fit rounded-full py-2 m-auto'
                                onClick={() => history.push('/dashboard')}
                                type='button'
                            >
                                Cancel
                            </button>
                            <button
                                className='bg-setlife rounded-full py-2 w-full'
                                onClick={() => saveAndContinue()}
                                type='button'
                            >
                                Create
                            </button>
                        </div>
                    </Section>
                </>
            }
            {!!currentProjectCreationPhase &&
                <>
                    <CreateProjectFunding
                        budgetRange={budgetRange}
                        currency={currency}
                        timeframeAmount={timeframeAmount}
                        setBudgetRange={setBudgetRange}
                        setCurrency={setCurrency}
                        setTimeFrameAmount={setTimeFrameAmount}
                    />
                    <p className='text-red-500 text-center'>
                        {errorMessage}
                    </p>
                    <Section>
                        <div className='grid grid-cols-1 gap-4 fixed bottom-20 left-20 right-20'>
                            <button 
                                type='button' 
                                className='text-center' 
                                onClick={() => {
                                    history.push('/dashboard')
                                    history.go(0)
                                }}
                            >
                                Skip
                            </button>
                            <button
                                className='bg-setlife rounded-full w-full py-2'
                                onClick={() => saveProjectFunding()}
                                type='button'
                            >
                                Continue
                            </button>
                        </div>
                    </Section>
                </>
            }
            <Snackbar
                autoHideDuration={4000}
                open={errorMessage != ''}
                onClose={handleAlertClose}
            >
                <Alert severity='error'>
                    {`${errorMessage}`}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default CreateProjectPage
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import Section from './Section'
import OnboardingNextSection from './OnboardingNextSection'
import CreateProject from './CreateProject'

import { CREATE_PERMISSION } from '../operations/mutations/PermissionMutations'

import { ADD_PROJECT } from '../operations/mutations/ProjectMutations'

import { sessionUser } from '../reactivities/variables'

const CreateProjectOnboarding = (props) => {

    const {
        goToNextSection,
        setProjectCreated
    } = props

    const [selectedUser, setSelectedUser] = useState(null)
    const [selectedRepo, setSelectedRepo] = useState(null)

    const [
        addProject,
        {
            data,
            loading: loadingAddProject,
            error
        }
    ] = useMutation(ADD_PROJECT, {
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

    const saveAndGoToNextSection = async () => {
        try {
            const newProject = await createProject()
            setProjectCreated(newProject)
            goToNextSection()
        } catch (err) {
            console.log(err)
        }
    }

    const createProject = async () => {
        const newProjectVariables = {
            name: selectedRepo.name,
            github_url: selectedRepo.githubUrl,
            is_public: !selectedRepo.private
        }
        const newProject = await addProject({ variables: newProjectVariables })
        if (newProject.errors) {
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
    return (
        <div className='CreateProjectOnboarding'>
            <Section>
                <div className='grid grid-cols-1 gap-2'>
                    <p className='text-3xl text-center font-bold'>
                        Create a project
                    </p>
                </div>
            </Section>
            <CreateProject
                selectedUser={selectedUser}
                selectedRepo={selectedRepo}
                setSelectedUser={setSelectedUser}
                setSelectedRepo={setSelectedRepo}
            />
            <OnboardingNextSection goToNextSection={saveAndGoToNextSection} />
        </div>
    )
}

export default CreateProjectOnboarding
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import CreateProject from '../components/CreateProject'
import Section from '../components/Section'

import { ADD_PROJECT } from '../operations/mutations/ProjectMutations'
import { CREATE_PERMISSION } from '../operations/mutations/PermissionMutations'

import { sessionUser } from '../reactivities/variables'

const CreateProjectPage = () => {

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

    const saveAndContinue = async () => {
        try {
            const newProject = await createProject()
            setProjectCreated(newProject)
            goToNextSection()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='CreateProject'>
            Create Project
            <CreateProject
                selectedUser={selectedUser}
                selectedRepo={selectedRepo}
                setSelectedUser={setSelectedUser}
                setSelectedRepo={setSelectedRepo}
            />
            <Section>
                <button
                    className='bg-setlife rounded-full w-full py-2'
                    onClick={() => saveAndContinue()}
                    type='button'
                >
                    Create
                </button>
            </Section>
        </div>
    )
}

export default CreateProjectPage
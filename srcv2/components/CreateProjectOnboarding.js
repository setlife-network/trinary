import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery, useMutation } from '@apollo/client'

import Section from './Section'
import Selector from './Selector'
import OnboardingNextSection from './OnboardingNextSection'

import { CREATE_PERMISSION } from '../operations/mutations/PermissionMutations'

import { GET_CONTRIBUTOR_ORGANIZATIONS_FROM_GITHUB, GET_CONTRIBUTOR_REPOS_FROM_GITHUB } from '../operations/queries/ContributorQueries'
import { ADD_PROJECT } from '../operations/mutations/ProjectMutations'

import { sessionUser } from '../reactivities/variables'

const CreateProjectOnboarding = (props) => {

    const {
        goToNextSection,
        setProjectCreated
    } = props

    const [openUsers, setOpenUsers] = useState(false)
    const [openRepos, setOpenRepos] = useState(false)
    const [userGitHubOrgs, setUserGitHubOrgs] = useState([])
    const [repoOptions, setRepoOptions] = useState([])
    const [hasMoreRepos, setHasMoreRepos] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [selectedRepo, setSelectedRepo] = useState(null)
    const [githubPage, setGithubPage] = useState(0)

    const {
        error: errorOrganizations,
        data: dataOrganizations,
        loading: loadingOrganizations
    } = useQuery(GET_CONTRIBUTOR_ORGANIZATIONS_FROM_GITHUB, {
        onCompleted: dataOrganizations => {
            const githubOrganizations = dataOrganizations.getGithubOrganizations
            setUserGitHubOrgs(githubOrganizations)
        }
    })

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

    const [getRepos, {
        error: errorOrganizationRepos,
        data: dataOrganizationRepos,
        loading: loadingOrganizationRepos
    }] = useLazyQuery(GET_CONTRIBUTOR_REPOS_FROM_GITHUB, {
        onCompleted: payload => {
            const {
                getGithubRepos: { length }
            } = payload
            if (length) {
                setSelectedRepo(dataOrganizationRepos.getGithubRepos[0])
                payload.getGithubRepos.forEach((repo) => {
                    if (!repoOptions.includes(repo)) {
                        setRepoOptions([
                            ...repoOptions,
                            ...payload.getGithubRepos
                        ])
                    }
                })
            }
            if (length >= 99) {
                setHasMoreRepos(true)
            } else {
                setHasMoreRepos(false)
            }
        }
    })

    useEffect(() => {
        if (dataOrganizations && selectedUser) {
            setRepoOptions([])
            getRepos({
                variables: {
                    accountId: selectedUser.id,
                    githubPageNumber: githubPage
                }
            })
        }
    }, [selectedUser])

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

    const renderGitHubOrgs = () => {
        const optionClick = (org) => {
            setOpenUsers(false)
            setSelectedUser(org)
        }
        return userGitHubOrgs.map(org => {
            return (
                <button className='flex px-4' onClick={() => optionClick(org)} type='button' tabIndex='-1' id='menu-item-0' key={org.name} role='menuitem'>
                    <img src={org.avatar} alt='avatar' className='h-5 w-5 rounded-full my-auto' />
                    <p 
                        className='text-gray-700 block px-4 py-2 text-sm text-ellipsis overflow-hidden'
                    >
                        {org.name}
                    </p>
                </button>
            )
        })
    }

    const renderRepos = () => {
        const optionClick = (repo) => {
            setOpenRepos(false)
            setSelectedRepo(repo)
        }
        return repoOptions.map(repo => {
            return (
                <button 
                    type='button'
                    onClick={() => optionClick(repo)}
                    className='text-gray-700 block px-4 py-2 text-sm text-ellipsis overflow-hidden'
                    role='menuitem'
                    tabIndex='-1'
                    id='menu-item-0'
                    key={repo.name}
                >
                    {repo.name}
                </button>    
            )
        })
    }

    return (
        <div className='CreateProjectOnboarding'>
            <Section>
                <div className='grid grid-cols-1 gap-2'>
                    <p className='text-3xl text-center font-bold'>
                        Create a project
                    </p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                    </p>
                </div>
            </Section>
            <Section>
                <div className='grid grid-flow-col auto-cols-max gap-4'>
                    <div className='rounded-full bg-setlife w-fit px-2 mx-auto'>
                        <p className='p-2 text-lg'>
                            1
                        </p>
                    </div>
                    <p className='m-auto'>
                        Connect a GitHub project
                    </p>
                </div>
                <div className='grid grid-cols-1 gap-4 mt-4'>
                    <Selector
                        title={selectedUser ? selectedUser.name : 'User/Organization'}
                        renderOptions={renderGitHubOrgs}
                        openOptions={openUsers}
                        setOpenOptions={setOpenUsers}
                        loadingOptions={loadingOrganizations}
                    />
                    <Selector
                        title={selectedRepo ? selectedRepo.name : 'Repo'}
                        renderOptions={renderRepos}
                        openOptions={openRepos}
                        setOpenOptions={setOpenRepos}
                        loadingOptions={loadingOrganizationRepos}
                    />
                    {/* {<div className='border border-light rounded-lg px-4 py-1'>
                        <p className='text-light'>Project name</p>
                    </div>} */}
                </div>
            </Section>
            <OnboardingNextSection goToNextSection={saveAndGoToNextSection} />
        </div>
    )
}

export default CreateProjectOnboarding
import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery, useMutation } from '@apollo/client'

import Section from './Section'
import OnboardingNextSection from './OnboardingNextSection'

import { CREATE_PERMISSION } from '../operations/mutations/PermissionMutations'

import { GET_CONTRIBUTOR_ORGANIZATIONS_FROM_GITHUB, GET_CONTRIBUTOR_REPOS_FROM_GITHUB } from '../operations/queries/ContributorQueries'
import { ADD_PROJECT } from '../operations/mutations/ProjectMutations'

import { sessionUser } from '../reactivities/variables'

const CreateProjectOnboarding = (props) => {

    const {
        goToNextSection 
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
            createProject()
            goToNextSection()
        } catch (err) {
            console.log(err)
        }
    }

    const createProject = async () => {
        const newProjectVariables = {
            name: selectedRepo.name,
            github_url: selectedRepo.githubUrl
        }
        const newProject = await addProject({ variables: newProjectVariables })
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
            console.log(repo)
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

    const selector = ({ title, renderOptions, openOptions, setOpenOptions, loadingOptions }) => {
        return (
            <div>
                <button type='button' className='border border-light rounded-lg px-4 py-1 w-full' onClick={() => setOpenOptions(!openOptions)}>
                    <div className='grid grid-flow-col auto-cols-max flex justify-between'>
                        <p className='text-light text-left'>{title}</p>
                        <svg className='-mr-1 ml-2 h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                            <path fillRule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clipRule='evenodd' />
                        </svg>
                    </div>
                </button>
                {openOptions &&
                    <div 
                        className='absolute right-0 left-0 z-10 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none mx-12 sm:mx-24 md:mx-48 lg:mx-96 max-h-52 overflow-scroll' 
                        role='menu'
                        aria-orientation='vertical' 
                        aria-labelledby='menu-button'
                        tabIndex='-1'
                    >
                        <div className='py-1' role='none'>
                            {loadingOptions && 
                                'Loading'
                            }
                            {renderOptions()}
                        </div>
                    </div>
                }
            </div>
        )
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
                    {selector({
                        title: selectedUser ? selectedUser.name : 'User/Organization',
                        renderOptions: renderGitHubOrgs,
                        openOptions: openUsers,
                        setOpenOptions: setOpenUsers,
                        loadingOptions: loadingOrganizations
                    })}
                    {selector({
                        title: selectedRepo ? selectedRepo.name : 'Repo',
                        renderOptions: renderRepos,
                        openOptions: openRepos,
                        setOpenOptions: setOpenRepos,
                        loadingOptions: loadingOrganizationRepos
                    })}
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
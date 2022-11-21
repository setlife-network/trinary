import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery, useMutation } from '@apollo/client'

import Section from './Section'
import Selector from './Selector'

import { GET_CONTRIBUTOR_ORGANIZATIONS_FROM_GITHUB, GET_CONTRIBUTOR_REPOS_FROM_GITHUB } from '../operations/queries/ContributorQueries'

const CreateProject = (props) => {

    const [openUsers, setOpenUsers] = useState(false)
    const [openRepos, setOpenRepos] = useState(false)
    const [userGitHubOrgs, setUserGitHubOrgs] = useState([])
    const [repoOptions, setRepoOptions] = useState([])
    const [hasMoreRepos, setHasMoreRepos] = useState(false)
    const [githubPage, setGithubPage] = useState(0)

    const {
        selectedUser,
        selectedRepo,
        setSelectedUser,
        setSelectedRepo
    } = props

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
        <div>
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
        </div>
    )
}

export default CreateProject
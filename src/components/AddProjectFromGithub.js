import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import {
    Avatar,
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@material-ui/core'

import LoadingProgress from './LoadingProgress'
import {
    GET_CONTRIBUTOR_ORGANIZATIONS_FROM_GITHUB,
    GET_CONTRIBUTOR_REPOS_FROM_GITHUB
} from '../operations/queries/ContributorQueries'

const AddProjectFromGithub = (props) => {
    const {
        clientId,
        setLinkedRepo,
        setProjectGithub
    } = props

    const {
        error: errorOrganizations,
        data: dataOrganizations,
        loading: loadingOrganizations
    } = useQuery(GET_CONTRIBUTOR_ORGANIZATIONS_FROM_GITHUB, {
        onCompleted: dataOrganizations => {
            const githubOrganizations = dataOrganizations.getGithubOrganizations
            setSelectedGithubOrganization(
                githubOrganizations.length
                    ? githubOrganizations[0]
                    : null
            )
        }
    })

    const [getRepos, {
        error: errorOrganizationRepos,
        data: dataOrganizationRepos,
        loading: loadingOrganizationRepos
    }] = useLazyQuery(GET_CONTRIBUTOR_REPOS_FROM_GITHUB, {
        onCompleted: dataOrganizationRepos => {
            const {
                getGithubRepos
            } = dataOrganizationRepos
            if (getGithubRepos.length) {
                setSelectedGithubRepo(dataOrganizationRepos.getGithubRepos[0])
            }
        }
    })

    const [selectedGithubOrganization, setSelectedGithubOrganization] = useState(null)
    const [selectedGithubRepo, setSelectedGithubRepo] = useState(null)

    useEffect(() => {
        if (dataOrganizations) {
            getRepos({
                variables: {
                    organizationName: selectedGithubOrganization.name
                }
            })
        }
    }, [selectedGithubOrganization])

    useEffect(() => {
        if (selectedGithubRepo) {
            setProjectGithub(selectedGithubRepo.githubUrl)
        }
    }, [selectedGithubRepo])

    const handleGithubOrganizationChange = ({ organizations, value }) => {
        setSelectedGithubOrganization(value)
        if (organizations[value].repos[0]) {
            setProjectGithub(organizations[value].repos[0].githubUrl)
            setLinkedRepo(true)
        } else {
            setProjectGithub(null)
            setLinkedRepo(false)
        }
    }

    const renderGithubOrganizations = ({ organizations }) => {
        return organizations.map((o, i) => {
            return (
                <MenuItem value={i}>
                    <Grid container spacing={3} alignItems='center'>
                        <Grid item>
                            <Avatar alt='Avatar' src={o.avatar} className='organization-avatar'/>
                        </Grid>
                        <Grid item>
                            {`${o.name ? o.name : 'Select'}`}
                        </Grid>
                    </Grid>
                </MenuItem>
            )
        })
    }

    const renderGithubRepos = ({ repos }) => {
        return repos.map((r, i) => {
            return (
                <MenuItem value={i}>
                    {`${r.name ? r.name : 'Select'}`}
                </MenuItem>
            )
        })
    }

    if (loadingOrganizations) return <LoadingProgress/>
    if (errorOrganizations) return `An error ocurred ${errorOrganizations}`

    if (loadingOrganizationRepos) return <LoadingProgress/>
    if (errorOrganizationRepos) return `An error ocurred ${errorOrganizationRepos}`

    const githubOrganizations = dataOrganizations.getGithubOrganizations
    const githubRepos = dataOrganizationRepos && dataOrganizationRepos.length
        ? dataOrganizationRepos.getGithubRepos
        : []

    return (
        <Grid
            container
            spacing={3}
            justify='space-between'
            alignItems='flex-end'
            className='AddProjectFromGithub'
        >
            <Grid item xs={12} align='left'>
                <Box my={3}>
                    <Typography>
                        {`Search for a repo directly from Github`}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={5}>
                <FormControl fullWidth>
                    <InputLabel>
                        {`User/Organization`}
                    </InputLabel>
                    <Select
                        fullWidth
                        value={githubOrganizations.indexOf(selectedGithubOrganization)}
                        onChange={(event) => (
                            setSelectedGithubOrganization(githubOrganizations[event.target.value])
                        )}
                    >
                        {renderGithubOrganizations({ organizations: githubOrganizations })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={5}>
                <FormControl fullWidth>
                    <InputLabel>
                        {`Repositories`}
                    </InputLabel>
                    <Select
                        fullWidth
                        value={githubRepos.indexOf(selectedGithubRepo)}
                        onChange={(event) => setSelectedGithubRepo(githubRepos[event.target.value])}
                    >
                        {renderGithubRepos({
                            repos: githubRepos
                        })}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default AddProjectFromGithub

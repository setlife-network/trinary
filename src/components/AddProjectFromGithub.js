import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
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
    } = useQuery(GET_CONTRIBUTOR_ORGANIZATIONS_FROM_GITHUB)

    const {
        error: errorOrganizationRepos,
        data: dataOrganizationRepos,
        loading: loadingOrganizationRepos
    } = useQuery(GET_CONTRIBUTOR_REPOS_FROM_GITHUB)

    const [selectedGithubOrganization, setSelectedGithubOrganization] = useState(0)
    const [selectedGithubRepo, setSelectedGithubRepo] = useState(0)

    useEffect(() => {
        setSelectedGithubRepo(0)
    }, [selectedGithubOrganization])

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

    const handleGithubRepoChange = ({ organizations, value }) => {
        setProjectGithub(organizations[selectedGithubOrganization].repos[value].githubUrl)
        setSelectedGithubRepo(value)
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
                    {`${r.name}`}
                </MenuItem>
            )
        })
    }

    if (loadingOrganizations) return <LoadingProgress/>
    if (errorOrganizations) return `An error ocurred ${errorOrganizations}`

    if (loadingOrganizationRepos) return <LoadingProgress/>
    if (errorOrganizationRepos) return `An error ocurred ${errorOrganizationRepos}`

    const { getGithubOrganizations } = dataOrganizations
    const { getGithubRepos } = dataOrganizationRepos

    const organizations = [...getGithubOrganizations]
    const repos = [...getGithubRepos]

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
                        value={selectedGithubOrganization}
                        onChange={(event) => handleGithubOrganizationChange({
                            organizations: repos,
                            value: event.target.value
                        })}
                    >
                        {renderGithubOrganizations({ organizations: organizations })}
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
                        value={selectedGithubRepo}
                        onChange={(event) => handleGithubRepoChange({
                            organizations: repos,
                            value: event.target.value
                        })}
                    >
                        {renderGithubRepos({
                            repos: repos[selectedGithubOrganization].repos
                        })}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default AddProjectFromGithub

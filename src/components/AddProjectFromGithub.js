import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@material-ui/core'

import { GET_CONTRIBUTOR_ORGANIZATIONS_REPOS_FROM_GITHUB } from '../operations/queries/ContributorQueries'

const AddProjectFromGithub = (props) => {
    const {
        clientId
    } = props

    const {
        error: errorOrganizationProjects,
        data: dataOrganizationProjects,
        loading: loadingOrganizationProjects
    } = useQuery(GET_CONTRIBUTOR_ORGANIZATIONS_REPOS_FROM_GITHUB)

    const [selectedGithubOrganization, setSelectedGithubOrganization] = useState(0)
    const [selectedGithubRepo, setSelectedGithubRepo] = useState(0)

    const handleGithubOrganizationChange = ({ value }) => {
        setSelectedGithubOrganization(value)
    }

    const handleGithubRepoChange = ({ value }) => {
        setSelectedGithubRepo(value)
    }

    const renderGithubOrganizations = ({ organizations }) => {
        return organizations.map((o, i) => {
            return (
                <MenuItem value={i}>
                    {`${o.name}`}
                </MenuItem>
            )
        })
    }

    const renderGithubRepos = ({ projects }) => {
        return projects.map((p, i) => {
            return (
                <MenuItem value={i}>
                    {`${p.name}`}
                </MenuItem>
            )
        })
    }

    if (loadingOrganizationProjects) return ''
    if (errorOrganizationProjects) return `An error ocurred ${errorOrganizationProjects}`

    const { getContributorGithubOrganizations: organizations } = dataOrganizationProjects

    return (
        <Grid container className='AddProjectFromGithub'>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>
                        {`Github organization`}
                    </InputLabel>
                    <Select
                        fullWidth
                        value={selectedGithubOrganization}
                        onChange={(event) => handleGithubOrganizationChange({
                            value: event.target.value
                        })}
                    >
                        {renderGithubOrganizations({ organizations: organizations })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>
                        {`Github projects`}
                    </InputLabel>
                    <Select
                        fullWidth
                        value={selectedGithubRepo}
                        onChange={(event) => handleGithubRepoChange({
                            value: event.target.value
                        })}
                    >
                        {renderGithubRepos({ projects: organizations[selectedGithubOrganization].repos })}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default AddProjectFromGithub

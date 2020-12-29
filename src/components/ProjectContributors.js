import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Grid
} from '@material-ui/core/'
import { filter } from 'lodash'

import { GET_PROJECT } from '../operations/queries/ProjectQueries'
import ContributorTile from './ContributorTile'

const ProjectContributors = (props) => {

    const { projectId } = props
    const { loading, error, data, networkStatus } = useQuery(GET_PROJECT, {
        variables: {
            id: Number(projectId)
        }
    })

    if (loading) {
        return (
            <Grid item xs={12}>
                Loading...
            </Grid>
        )
    }
    if (error) return `Error! ${error.message}`

    const project = data.getProjectById
    const { allocations } = project
    const activeAllocations = filter(allocations, 'active')
    const activeContributors = activeAllocations.map(a => {
        return a.contributor
    })

    const renderContributors = (contributors) => {

        return contributors.map(c => {
            return (
                <ContributorTile
                    contributor={c}
                />
            )
        })
    }

    return (
        <Grid container className='ProjectContributors'>
            <h1>Trinary Contributors</h1>
            <Grid xs={12}/>
            <Grid item xs={12} md={4}>
                <Box
                    bgcolor='primary.black'
                    color='primary.light'
                    borderRadius='borderRadius'
                    px={5}
                    py={1}
                >
                    {
                        `${activeContributors.length} active ${activeContributors.length == 1
                            ? 'contributor'
                            : 'contributors'
                        }`
                    }
                </Box>
            </Grid>
            <Grid item xs={12}>
                {renderContributors(activeContributors)}
            </Grid>
        </Grid>
    );
}

export default ProjectContributors

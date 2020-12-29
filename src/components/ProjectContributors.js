import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Grid
} from '@material-ui/core/'
import { differenceBy, filter } from 'lodash'

import { GET_PROJECT } from '../operations/queries/ProjectQueries'
import { GET_CONTRIBUTORS } from '../operations/queries/ContributorQueries'
import ContributorTile from './ContributorTile'

const ProjectContributors = (props) => {

    const { projectId } = props
    // const { loading, error, data, networkStatus } = useQuery(GET_PROJECT, {
    //     variables: {
    //         id: Number(projectId)
    //     }
    // })

    const { data: dataProject, error: errorProject, loading: loadingProject } = useQuery(GET_PROJECT, {
        variables: {
            id: Number(projectId)
        }
    })
    const { data: dataContributors, error: errorContributors, loading: loadingContributors } = useQuery(GET_CONTRIBUTORS)

    if (loadingProject || loadingContributors) {
        return (
            <Grid item xs={12}>
                Loading...
            </Grid>
        )
    }
    if (errorProject || errorContributors) return `Error!`

    const project = dataProject.getProjectById
    const { allocations } = project
    const activeAllocations = filter(allocations, 'active')
    const activeContributors = activeAllocations.map(a => {
        return a.contributor
    })
    const { getContributors: contributors } = dataContributors
    const otherOrganizationContributors = differenceBy(contributors, activeContributors, 'id')

    const renderContributors = (active, contributors) => {

        return contributors.map(c => {
            return (
                <Grid item xs={12} sm={6}>
                    <ContributorTile
                        active={active}
                        contributor={c}
                    />
                </Grid>

            )
        })
    }

    return (
        <Grid container className='ProjectContributors'>
            <h1>{`Trinary Contributors`}</h1>
            <Grid xs={12}/>
            <Grid item xs={12} sm={5}>
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
                <Box my={5}>
                    {renderContributors(true, activeContributors)}
                </Box>
                <hr/>
            </Grid>
            <h1>{`Github Contributors`}</h1>
            <Grid item xs={12}>
                <Box>
                    <Grid container>
                        {renderContributors(false, otherOrganizationContributors)}
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}

export default ProjectContributors

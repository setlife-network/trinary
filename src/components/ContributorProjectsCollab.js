import React from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Card,
    Grid,
    Typography
} from '@material-ui/core'

import ProjectTile from './ProjectTile'
import { GET_CONTRIBUTOR_PROJECTS } from '../operations/queries/ContributorQueries'

const ContributorProjectsCollab = (props) => {

    const {
        contributorId
    } = props

    const {
        data: dataContributorProjects,
        error: errorContributorProjects,
        loading: loadingContributorProjects
    } = useQuery(GET_CONTRIBUTOR_PROJECTS, {
        variables: {
            id: Number(contributorId)
        }
    })

    const renderProjects = ({ propjects }) => {
        return projects.map(p => {
            return (
                <Grid item xs={3} className>
                    <Box my={2}>
                        <ProjectTile project={p}/>
                    </Box>
                </Grid>
            )
        })
    }

    if (loadingContributorProjects) return 'Loading...'
    if (errorContributorProjects) return 'Error!'

    const { getContributorById: contributor } = dataContributorProjects
    const projects = []
    contributor.allocations.map(a => {
        if (!projects.includes(a.project)) {
            projects.push(a.project)
        }
    })

    return (

        <Grid contianer>
            <Grid item xs={12} align='left'>
                <Box my={5} mx={3}>
                    <Typography variant='h5' color='primary'>
                        <strong>
                            {`Project Involvment`}
                        </strong>
                    </Typography>
                    {renderProjects({ projects: projects })}
                </Box>
            </Grid>
        </Grid>
    )
}

export default ContributorProjectsCollab

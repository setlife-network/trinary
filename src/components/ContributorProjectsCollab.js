import React from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Card,
    Grid,
    Typography
} from '@material-ui/core'
import { find, isEmpty } from 'lodash'
import moment from 'moment'

import EmptyState from './EmptyState'
import LoadingProgress from './LoadingProgress'
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
            console.log('p');
            console.log(p);
            return (
                <Grid item xs={12} sm={6} md={3}>
                    <Box my={2}>
                        <ProjectTile
                            project={p}
                        />
                    </Box>
                </Grid>
            )
        })
    }

    if (loadingContributorProjects) return <LoadingProgress/>
    if (errorContributorProjects) return 'Error!'

    const { getContributorById: contributor } = dataContributorProjects
    const projects = []
    contributor.allocations.map(a => {
        if (!find(projects, a.project)) {
            projects.push({ ...a.project })
            //check if it's an active allocation
            if (moment(a['start_date'], 'x').isBefore(moment()) && moment(a['end_date'], 'x').isAfter(moment())) {
                projects[projects.length - 1]['active_contributor'] = true
            } else {
                projects[projects.length - 1]['active_contributor'] = false
            }
        }
    })

    return (
        <Grid container className='ContributorProjectsCollab'>
            <Grid item xs={12} align='left'>
                <Box my={5} mx={3}>
                    <Typography variant='h5' color='primary'>
                        <strong>
                            {`Project Involvement`}
                        </strong>
                    </Typography>
                    <Grid container>
                        {
                            !isEmpty(projects)
                                ? renderProjects({ projects: projects })
                                : (
                                    <EmptyState
                                        description='This contributor has no projects at the moment'
                                        iconClassname='fas fa-code'
                                    />
                                )
                        }
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ContributorProjectsCollab

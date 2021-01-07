import React from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'

import ContributorTimeTrackedTile from './ContributorTimeTrackedTile'
import { GET_PROJECT_TIME_ENTRIES } from '../operations/queries/ProjectQueries'

const ProjectTimeTracking = (props) => {

    const { project } = props

    const { data, loading, error } = useQuery(GET_PROJECT_TIME_ENTRIES, {
        variables: {
            id: project.id,
            fromDate: null,
            toDate: null
        }
    })
    if (loading) return 'Loading...'
    if (error) return error

    const { timeEntries, timeSpent, timeSpentPerContributor } = data.getProjectById

    const projectHoursSpent = timeSpent.seconds
        ? Math.trunc(project.timeSpent.seconds / 3600)
        : 0

    const contributorTimeEntries = timeSpentPerContributor

    const renderContributorTimeEntries = (timeEntries) => {
        return timeEntries.map(t => {
            return (
                <ContributorTimeTrackedTile timeEntry={t}/>
            )
        })
    }

    return (
        <Grid container className='ProjectTimeTracking'>
            <Grid item xs={12}>
                <Typography variant='h4' align='left'>
                    <strong>
                        {'Time Tracking'}
                    </strong>
                </Typography>
            </Grid>
            <Grid item xs={5} md={4}>
                <Box
                    bgcolor='primary.black'
                    color='primary.light'
                    borderRadius='borderRadius'
                    mt={2}
                    px={5}
                    py={1}
                >
                    {`${projectHoursSpent} h. Total`}
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box mt={5}>
                    {renderContributorTimeEntries(contributorTimeEntries)}
                </Box>
            </Grid>
        </Grid>
    )
}

export default ProjectTimeTracking

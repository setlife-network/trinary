import React from 'react'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'

import ContributorTimeEntry from './ContributorTimeEntry'

const ProjectTimeTracking = (props) => {

    const renderContributorTimeEntries = (timeEntries) => {
        return timeEntries.map(t => {
            return (
                <ContributorTimeEntry timeEntry={t}/>
            )
        })
    }

    const { project } = props

    const projectHoursSpent = project.timeSpent.seconds
        ? Math.trunc(project.timeSpent.seconds / 3600)
        : 0

    const projectTimeEntries = project.timeEntries

    return (
        <Grid container className='ProjectTimeTracking'>
            <Grid item xs={12}>
                <Typography variant='h4' align='left'>
                    <strong>
                        {'Time Tracking'}
                    </strong>
                </Typography>
            </Grid>
            <Grid item xs={3}>
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
                    {renderContributorTimeEntries(projectTimeEntries)}
                </Box>
            </Grid>
        </Grid>
    )
}

export default ProjectTimeTracking

import React from 'react'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'

import ContributorTimeEntry from './ContributorTimeEntry'

const timeEntries = [
    {
        name: 'Contributor name',
        time: 20
    }
]

const ProjectTimeTracking = (props) => {

    const renderContributorTimeEntries = (timeEntries) => {

        return timeEntries.map(t => {
            return (
                <ContributorTimeEntry timeEntry={t}/>
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
            <Grid item xs={3}>
                <Box
                    bgcolor='primary.black'
                    color='primary.light'
                    borderRadius='borderRadius'
                    mt={2}
                    px={5}
                    py={1}
                >
                    {`XXX. h. Total`}
                </Box>
            </Grid>
            <Grid item xs={12}>
                {renderContributorTimeEntries(timeEntries)}
            </Grid>
        </Grid>
    )
}

export default ProjectTimeTracking

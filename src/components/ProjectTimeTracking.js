import React, { useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'
import moment from 'moment'

import ContributorTimeTrackedTile from './ContributorTimeTrackedTile'
import { GET_PROJECT_TIME_ENTRIES } from '../operations/queries/ProjectQueries'

const ProjectTimeTracking = (props) => {

    const { project } = props

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [
        getProjetTimeEntries,
        { data: rangedTimeData, loading: rangedTimeLoading, error: rangedTimeError }
    ] = useLazyQuery(GET_PROJECT_TIME_ENTRIES, {
        variables: {
            id: project.id,
            fromDate: moment(startDate).format('YYYY-MM-DD'),
            toDate: moment(endDate).format('YYYY-MM-DD')
        }
    })

    const getRangedTimeEntries = (date) => {
        setEndDate(date)
        getProjetTimeEntries()
    }

    const { data: allTimeEntriesData, loading: allTimeEntriesLoading, error: allTimeEntriesError } = useQuery(GET_PROJECT_TIME_ENTRIES, {
        variables: {
            id: project.id,
            fromDate: null,
            toDate: null
        }
    })
    if (allTimeEntriesLoading || rangedTimeLoading) return 'Loading...'
    if (allTimeEntriesError || rangedTimeError) return 'error!'

    const {
        timeEntries,
        timeSpent,
        timeSpentPerContributor
    } = rangedTimeData
        ? rangedTimeData.getProjectById
        : allTimeEntriesData.getProjectById

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
            <Grid item>
                <Box my={3} mr={1}>
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                    />
                </Box>
            </Grid>
            <Grid item>
                <Box my={3} ml={1}>
                    <DatePicker
                        selected={endDate}
                        onChange={date => getRangedTimeEntries(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </Box>
            </Grid>
            <Grid item xs={12}/>
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

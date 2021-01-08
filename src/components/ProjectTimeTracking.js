import React, { useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    Box,
    Button,
    Grid,
    Typography
} from '@material-ui/core'
import moment from 'moment'

import ContributorTimeTrackedTile from './ContributorTimeTrackedTile'
import { GET_PROJECT_TIME_ENTRIES } from '../operations/queries/ProjectQueries'

const ProjectTimeTracking = (props) => {

    const { project } = props

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const [
        getProjetTimeEntries,
        { data: rangedTimeData, loading: rangedTimeLoading, error: rangedTimeError }
    ] = useLazyQuery(GET_PROJECT_TIME_ENTRIES, {
        variables: {
            id: project.id,
            fromDate: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
            toDate: endDate ? moment(endDate).format('YYYY-MM-DD') : null
        }
    })

    const clearDateInput = () => {
        setStartDate(null)
        setEndDate(null)
        getProjetTimeEntries()
    }

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
        ? Math.trunc(timeSpent.seconds / 3600)
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
        <Grid container className='ProjectTimeTracking' alignItems='flex-end'>
            <Grid item xs={12}>
                <Typography variant='h4' align='left'>
                    <strong>
                        {'Time Tracking'}
                    </strong>
                </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
                <Box mt={3}>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText='Tap to add a date'
                        className='date-input start-date'
                    />
                </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
                <Box mt={3}>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => getRangedTimeEntries(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        placeholderText='Tap to add a date'
                        className='date-input end-date'
                    />
                </Box>
            </Grid>
            <Grid item xs={12} sm={3} align='left'>
                <Box mt={3} px={2}>
                    <Button
                        color='primary'
                        disabled={!startDate && !endDate}
                        onClick={() => clearDateInput()}
                    >
                        {`Clear dates`}
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}/>
            <Grid item xs={12} md={4}>
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
                <Box my={5} pb={3}>
                    {renderContributorTimeEntries(contributorTimeEntries)}
                </Box>
            </Grid>
        </Grid>
    )
}

export default ProjectTimeTracking

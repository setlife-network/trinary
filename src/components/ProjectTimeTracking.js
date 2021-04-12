import React, { useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
// import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { RangeDatePicker } from 'react-google-flight-datepicker'
import 'react-google-flight-datepicker/dist/main.css'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Grid,
    Typography
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import moment from 'moment'

import ContributorTimeTrackedTile from './ContributorTimeTrackedTile'
import LoadingProgress from './LoadingProgress'
import { GET_PROJECT_TIME_ENTRIES } from '../operations/queries/ProjectQueries'
import { TIME_RANGES } from '../constants'

const ProjectTimeTracking = (props) => {

    const { projectId } = props

    const [endDate, setEndDate] = useState(null)
    const [startDate, setStartDate] = useState(null)

    const [
        getProjectTimeEntries,
        {
            data: dataRangedTime,
            loading: loadingRangedTime,
            error: errorRangedTime
        }
    ] = useLazyQuery(GET_PROJECT_TIME_ENTRIES)

    const clearDateInput = () => {
        setStartDate(null)
        setEndDate(null)
        getProjectTimeEntries({ variables: {
            id: projectId,
            fromDate: null,
            toDate: null
        } })
    }

    const getRangedTimeEntries = (startDate, endDate) => {
        setStartDate(startDate)
        setEndDate(endDate)
        if (endDate) {
            getProjectTimeEntries({ variables: {
                id: projectId,
                fromDate: moment(startDate).format('YYYY-MM-DD'),
                toDate: moment(endDate).format('YYYY-MM-DD')
            } })
        }
    }

    const setFixedRangedTime = ({ startDate, endDate }) => {
        setStartDate(startDate)
        setEndDate(endDate)
    }

    const renderFixedRangeTimes = (timeRanges) => {

        return timeRanges.map(tr => {

            const day = moment().subtract(tr.since, tr.periodRange)
            const startDate = day.clone().startOf(tr.periodRange)
            const endDate = day.clone().endOf(tr.periodRange)

            return (
                <Grid item md={2} className='time-ranges'>
                    <Box align='left'>
                        <Button
                            color='primary'
                            onClick={() => setFixedRangedTime({ startDate, endDate })}
                        >

                            {tr.description}

                        </Button>
                    </Box>
                </Grid>
            )
        })

    }

    const {
        data: dataAllTimeEntries,
        loading: loadingAllTimeEntries,
        error: errorAllTimeEntries
    } = useQuery(GET_PROJECT_TIME_ENTRIES, {
        variables: {
            id: projectId,
            fromDate: null,
            toDate: null
        }
    })
    if (loadingAllTimeEntries || loadingRangedTime) return <LoadingProgress/>
    if (errorAllTimeEntries || errorRangedTime) return 'error!'

    const {
        timeEntries,
        timeSpent,
        timeSpentPerContributor
    } = dataRangedTime
        ? dataRangedTime.getProjectById
        : props

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
            <Grid item xs={12} lg={9} align='left'>
                <Box
                    className='RangeDatePicker'
                    mt={2}
                    bgcolor='primary.light'
                    borderRadius='borderRadius'
                    boxShadow={3}
                    px={1}
                    pb={1}
                    pt={2}
                >
                    <Grid container>
                        {renderFixedRangeTimes(TIME_RANGES)}
                    </Grid>
                    <RangeDatePicker
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(startDate, endDate) => getRangedTimeEntries(startDate, endDate)}
                        dateFormat='MMM D YYYY'
                    />
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
            <Grid item xs={12} sm={4}>
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

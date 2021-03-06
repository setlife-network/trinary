import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Grid,
    Icon,
    Typography
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import moment from 'moment'

import ContributorTimeTrackedTile from './ContributorTimeTrackedTile'
import LoadingProgress from './LoadingProgress'
import RangeDatePickerInput from './RangeDatePickerInput'
import { GET_PROJECT_TIME_ENTRIES } from '../operations/queries/ProjectQueries'
import { TIME_RANGES } from '../constants'

const ProjectTimeTracking = (props) => {

    const { projectId } = props

    const [endDate, setEndDate] = useState(null)
    const [startDate, setStartDate] = useState(null)

    useEffect(() => {
        getRangedTimeEntries({ startDate, endDate })
    }, [endDate])

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

    const setDates = (dates) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
    }

    const getRangedTimeEntries = ({ startDate, endDate }) => {
        if (endDate) {
            getProjectTimeEntries({ variables: {
                id: projectId,
                fromDate: moment(startDate).format('YYYY-MM-DD'),
                toDate: moment(endDate).format('YYYY-MM-DD')
            } })
        }
    }

    const setFixedRangedTime = ({ startDate, endDate }) => {
        setStartDate(startDate['_d'])
        setEndDate(endDate['_d'])
    }

    const renderFixedRangeTimes = (timeRanges) => {

        return timeRanges.map(tr => {

            const day = moment().subtract(tr.since, tr.periodRange)
            const startDate = day.clone().startOf(tr.periodRange)
            const endDate = day.clone().endOf(tr.periodRange)

            return (
                <Grid item md={2} className='time-ranges'>
                    <Box align='left' mb={2}>
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
                <Typography variant='h5' align='left'>
                    <strong>
                        {'Time Tracking'}
                    </strong>
                </Typography>
            </Grid>
            <Grid item xs={12} lg={10} xl={8} align='left'>
                <Box
                    px={2}
                    mt={3}
                    py={2}
                    borderRadius='borderRadius'
                    bgcolor='primary.light'
                >
                    <Grid container className='RangeDatePicker'>
                        {renderFixedRangeTimes(TIME_RANGES)}
                        <Grid item xs={12} xl={8} >
                            <DatePicker
                                selected={startDate}
                                startDate={startDate}
                                endDate={endDate}
                                shouldCloseOnSelect={startDate && !endDate}
                                selectsRange
                                onChange={(dates) => setDates(dates)}
                                customInput={
                                    <Box
                                        px={2}
                                        borderRadius='borderRadius'
                                        bgcolor='primary.light'
                                        className='date-picker'
                                    >
                                        <RangeDatePickerInput
                                            endDate={endDate}
                                            startDate={startDate}
                                        />
                                    </Box>
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box mt={1}>
                                <Button
                                    color='primary'
                                    disabled={!startDate && !endDate}
                                    onClick={() => clearDateInput()}
                                >
                                    {`Clear dates`}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>

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
                <Box my={[2, 5]} pb={3}>
                    {renderContributorTimeEntries(contributorTimeEntries)}
                </Box>
            </Grid>
        </Grid>
    )
}

export default ProjectTimeTracking

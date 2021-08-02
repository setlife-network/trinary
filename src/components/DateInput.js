import React, { useState } from 'react'
import {
    Box,
    Grid,
    Typography,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DatePicker from 'react-datepicker'
import RangeDatePickerInput from './RangeDatePickerInput'
import moment from 'moment'

const DateInput = (props) => {

    const {
        startDate,
        endDate,
        setStartDate,
        setEndDate,
    } = props
    
    const [selectedWeek, setSelectedWeek] = useState()
    const [selectedMonth, setSelectedMonth] = useState()
    const [selectedYear, setSelectedYear] = useState()

    const getRangedTimeEntries = (dates) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
    }

    const getWeekMonthYears = (weeks, months, years) => {
        setSelectedWeek(weeks)
        setSelectedMonth(months)
        setSelectedYear(years)
        let endingDate
        if (weeks) {
            endingDate = moment(startDate).add(weeks, 'weeks')
        } else if (months) {
            endingDate = moment(startDate).add(months, 'months')
        } else if (years) {
            endingDate = moment(startDate).add(years, 'years')
        }
        setEndDate(endingDate['_d'])
    }

    return (
        <Grid container className='DateInput'>
            <Accordion className='accordion-select-week'>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant='h6'>
                        {'Quick Select'}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid item xs={12}>
                        <Box px={2} py={1}>
                            <Grid 
                                container 
                                spacing={2}
                            >
                                <Grid item xs={2}>
                                    <Typography variant='subtitle1'>
                                        Weeks
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button 
                                        color='primary'
                                        variant={`${selectedWeek == 1 
                                            ? 'contained' 
                                            : 'outlined'
                                        }`}
                                        onClick={() => getWeekMonthYears(1)}
                                    >
                                        1
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button 
                                        color='primary'
                                        variant={`${selectedWeek == 2 
                                            ? 'contained' 
                                            : 'outlined'
                                        }`}
                                        onClick={() => getWeekMonthYears(2)}
                                    > 
                                        2
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button 
                                        color='primary'
                                        variant={`${selectedWeek == 3 
                                            ? 'contained' 
                                            : 'outlined'
                                        }`}
                                        onClick={() => getWeekMonthYears(3)}
                                    >
                                        3
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button 
                                        color='primary'
                                        variant={`${selectedWeek == 4 
                                            ? 'contained' 
                                            : 'outlined'
                                        }`}
                                        onClick={() => getWeekMonthYears(4)}
                                    >
                                        4
                                    </Button>
                                </Grid>
                                <Grid item xs={2} />
                                <Grid item xs={2}>
                                    <Typography variant='subtitle1'>
                                        Months
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button 
                                        color='primary'
                                        variant={`${selectedMonth == 2 
                                            ? 'contained' 
                                            : 'outlined'
                                        }`}
                                        onClick={() => getWeekMonthYears(0, 2, 0)}
                                    >
                                        2
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button 
                                        color='primary'
                                        variant={`${selectedMonth == 4 
                                            ? 'contained' 
                                            : 'outlined'
                                        }`}
                                        onClick={() => getWeekMonthYears(0, 4, 0)}
                                    >
                                        4
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button 
                                        color='primary'
                                        variant={`${selectedMonth == 6 
                                            ? 'contained' 
                                            : 'outlined'
                                        }`}
                                        onClick={() => getWeekMonthYears(0, 6, 0)}
                                    >
                                        6
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button  
                                        color='primary'
                                        variant={`${selectedMonth == 8 
                                            ? 'contained' 
                                            : 'outlined'
                                        }`}
                                        onClick={() => getWeekMonthYears(0, 8, 0)}
                                    >
                                        8
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button  
                                        color='primary'
                                        variant={`${selectedMonth == 10 
                                            ? 'contained' 
                                            : 'outlined'
                                        }`}
                                        onClick={() => getWeekMonthYears(0, 10, 0)}
                                    >
                                        10
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant='subtitle1'>
                                        Years
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button  
                                        color='primary'
                                        variant={`${selectedYear == 1 
                                            ? 'contained' 
                                            : 'outlined'
                                        }`}
                                        onClick={() => getWeekMonthYears(0, 0, 1)}
                                    >
                                        1
                                    </Button>
                                </Grid> 
                                <Grid item xs={2}>
                                    <Button  
                                        color='primary'
                                        variant={`${selectedYear == 2 
                                            ? 'contained' 
                                            : 'outlined'
                                        }`}
                                        onClick={() => getWeekMonthYears(0, 0, 2)}
                                    >
                                        2
                                    </Button>
                                </Grid> 
                                <Grid item xs={2}>
                                    <Button  
                                        color='primary'
                                        variant={`${selectedYear == 3 
                                            ? 'contained' 
                                            : 'outlined'
                                        }`}
                                        onClick={() => getWeekMonthYears(0, 0, 3)}
                                    >
                                        3
                                    </Button>
                                </Grid> 
                                <Grid item xs={2}>
                                    <Button  
                                        color='primary'
                                        variant={`${selectedYear == 4 
                                            ? 'contained' 
                                            : 'outlined'
                                        }`}
                                        onClick={() => getWeekMonthYears(0, 0, 4)}
                                    >
                                        4
                                    </Button>
                                </Grid> 
                                <Grid item xs={2}>
                                    <Button  
                                        color='primary'
                                        variant={`${selectedYear == 5 
                                            ? 'contained' 
                                            : 'outlined'
                                        }`}
                                        onClick={() => getWeekMonthYears(0, 0, 5)}
                                    >
                                        5
                                    </Button>
                                </Grid> 
                            </Grid>
                        </Box>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Grid item xs={12} className='RangeDatePicker'>
                <DatePicker
                    selected={startDate}
                    startDate={startDate}
                    endDate={endDate}
                    shouldCloseOnSelect={startDate && !endDate}
                    selectsRange
                    onChange={(dates) => getRangedTimeEntries(dates)}
                    customInput={
                        <Box
                            px={2}
                            mt={3}
                            borderRadius='borderRadius'
                            bgcolor='primary.light'
                            className='date-picker'
                        >
                            <RangeDatePickerInput
                                startDate={startDate
                                    ? moment.utc(startDate).format('MM/DD/YYYY')
                                    : 'Start date'
                                }
                                endDate={endDate
                                    ? moment.utc(endDate).format('MM/DD/YYYY')
                                    : 'End date'
                                }
                            />
                        </Box>
                    }
                />
            </Grid>
        </Grid>
    )
}

export default DateInput
import React, { useState } from 'react'
import {
    Box,
    Grid,
    withWidth,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
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
        width
    } = props
    
    const [selectedWeek, setSelectedWeek] = useState()
    const [selectedMonth, setSelectedMonth] = useState()
    const [selectedYear, setSelectedYear] = useState()

    const getRangedTimeEntries = (dates) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
    }

    const addWeek = (weeks) => {
        const endingDate = moment(startDate).add(weeks, 'weeks')
        setSelectedWeek(weeks)
        setEndDate(endingDate['_d'])
    }

    const addMonth = (months) => {
        const endingDate = moment(startDate).add(months, 'months')
        setSelectedMonth(months)
        setEndDate(endingDate['_d'])
    }

    const addYear = (years) => {
        const endingDate = moment(startDate).add(years, 'years')
        setSelectedYear(years)
        setEndDate(endingDate['_d'])
    }

    return (
        <Grid container className='DateInput'>
            <Box mt={3}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography 
                            variant='h6' 
                            align='center'
                        >
                            {'Quick Select'}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid item xs={12}>
                            <Box px={2} py={1}>
                                {width == 'xs' 
                                    ? (
                                        <Grid 
                                            container
                                            spacing={2}
                                        >
                                            <Grid item xs={12}>
                                                <FormControl fullWidth>
                                                    <InputLabel>
                                                        {'Weeks'}
                                                    </InputLabel>
                                                    <Select
                                                        fullWidth
                                                        value={selectedWeek}
                                                        onChange={(event) => addWeek(event.target.value)}
                                                    >
                                                        <MenuItem value={1}>1</MenuItem>
                                                        <MenuItem value={2}>2</MenuItem>
                                                        <MenuItem value={3}>3</MenuItem>
                                                        <MenuItem value={4}>4</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl fullWidth>
                                                    <InputLabel>
                                                        {'Months'}
                                                    </InputLabel>
                                                    <Select
                                                        fullWidth
                                                        value={selectedMonth}
                                                        onChange={(event) => addMonth(event.target.value)}
                                                    >
                                                        <MenuItem value={2}>2</MenuItem>
                                                        <MenuItem value={4}>4</MenuItem>
                                                        <MenuItem value={6}>6</MenuItem>
                                                        <MenuItem value={8}>8</MenuItem>
                                                        <MenuItem value={10}>10</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl fullWidth>
                                                    <InputLabel>
                                                        {'Years'}
                                                    </InputLabel>
                                                    <Select
                                                        fullWidth
                                                        value={selectedYear}
                                                        onChange={(event) => addYear(event.target.value)}
                                                    >
                                                        <MenuItem value={1}>1</MenuItem>
                                                        <MenuItem value={2}>2</MenuItem>
                                                        <MenuItem value={3}>3</MenuItem>
                                                        <MenuItem value={4}>4</MenuItem>
                                                        <MenuItem value={5}>5</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    )
                                    : (
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
                                                    onClick={() => addWeek(1)}
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
                                                    onClick={() => addWeek(2)}
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
                                                    onClick={() => addWeek(3)}
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
                                                    onClick={() => addWeek(4)}
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
                                                    onClick={() => addMonth(2)}
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
                                                    onClick={() => addMonth(4)}
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
                                                    onClick={() => addMonth(6)}
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
                                                    onClick={() => addMonth(8)}
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
                                                    onClick={() => addMonth(10)}
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
                                                    onClick={() => addYear(1)}
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
                                                    onClick={() => addYear(2)}
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
                                                    onClick={() => addYear(3)}
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
                                                    onClick={() => addYear(4)}
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
                                                    onClick={() => addYear(5)}
                                                >
                                                    5
                                                </Button>
                                            </Grid> 
                                        </Grid>
                                    )
                                }
                            </Box>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Box>
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

export default withWidth()(DateInput)
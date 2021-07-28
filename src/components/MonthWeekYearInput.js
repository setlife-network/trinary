import React, { useState, useEffect } from 'react'
import moment from 'moment'
import {
    Box,
    Grid,
    Typography,
    Button,
    withWidth,
    Select,
    InputLabel,
    FormControl,
    MenuItem
} from '@material-ui/core'

const MonthWeekYearInput = ({ width, endDate, startDate }) => {

    const [selectedWeek, setSelectedWeek] = useState()
    const [selectedMonth, setSelectedMonth] = useState()
    const [selectedYear, setSelectedYear] = useState()
    const [selectedStartDate, setSelectedStartDate] = useState(startDate)
    const [selectedEndDate, setSelectedEndDate] = useState(endDate)

    const changeWeek = (weeks) => {
        setSelectedWeek(weeks)
        setSelectedStartDate(moment.utc(startDate).add(weeks, 'weeks').calendar('MM/DD/YYYY'))
        setSelectedEndDate(moment.utc(endDate).add(weeks, 'weeks').calendar('MM/DD/YYYY'))
    }

    // const changeMonth = (months) => {

    // }

    // const changeYear = (years) => {

    // }

    return (
        <Box px={2} py={1} className='MonthWeekYearInput'>
            <Box my={2}>
                <Typography 
                    variant='h6' 
                    align='center'
                >
                    Select date
                </Typography>
            </Box>
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
                                    onChange={(event) => setSelectedWeek(event.target.value)}
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
                                    onChange={(event) => setSelectedMonth(event.target.value)}
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
                                    onChange={(event) => setSelectedYear(event.target.value)}
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
                                onClick={() => changeWeek(1)}
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
                                onClick={() => changeWeek(2)}
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
                                onClick={() => changeWeek(3)}
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
                                onClick={() => changeWeek(4)}
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
                                onClick={() => setSelectedMonth(2)}
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
                                onClick={() => setSelectedMonth(4)}
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
                                onClick={() => setSelectedMonth(6)}
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
                                onClick={() => setSelectedMonth(8)}
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
                                onClick={() => setSelectedMonth(10)}
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
                                onClick={() => setSelectedYear(1)}
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
                                onClick={() => setSelectedYear(2)}
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
                                onClick={() => setSelectedYear(3)}
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
                                onClick={() => setSelectedYear(4)}
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
                                onClick={() => setSelectedYear(5)}
                            >
                                5
                            </Button>
                        </Grid> 
                    </Grid>
                )
            }
            <Box my={2}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography align='center'>
                            {selectedStartDate}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align='center'>
                            {selectedEndDate}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default withWidth()(MonthWeekYearInput)
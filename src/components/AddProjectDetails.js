import React, { useState } from 'react'

import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography
} from '@material-ui/core'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

import { EXPECTED_BUDGET_TIMEFRAME_OPTIONS } from '../constants'
import {
    selectCurrencyInformation
} from '../scripts/selectors'

const AddProjectDetails = (props) => {

    const {
        budgetTimeframe,
        client,
        projectDate,
        setBudgetTimeframe,
        setProjectBudget,
        setProjectDate,
        setProjectName,
        setProjectToggl
    } = props

    const handleBudgetChange = (input) => {
        const amount = Number(input.replace(/\D/g, ''))
        setProjectBudget(amount)
    }
    const handleDateChange = (date) => {
        setProjectDate(moment(date['_d']).format('YYYY-MM-DD'))
    }
    const handleTimeframeChange = (timeframe) => {
        setBudgetTimeframe(timeframe)
    }

    const currencyInformation = selectCurrencyInformation({
        currency: client.currency
    })

    const renderTimeframeOptions = ({ timeframes }) => {
        return timeframes.map((timeframe, i) => {
            return (
                <MenuItem value={i}>
                    {`${timeframe.label}`}
                </MenuItem>
            )
        })
    }

    return (

        <Grid container justify='space-between'>
            <Grid item xs={12} md={5}>
                <Box xs={10} my={2}>
                    <TextField
                        label='Project name'
                        id='projectName'
                        variant='outlined'
                        fullWidth
                        required
                        onChange={(event) => setProjectName(event.target.value)}
                    />
                </Box>
            </Grid>

            <Grid item xs={12} md={5}>
                <Box xs={10} my={2}>
                    <TextField
                        label='Toggl URL'
                        id='projectToggl'
                        variant='outlined'
                        fullWidth
                        onChange={(event) => setProjectToggl(event.target.value)}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} md={5}>
                <Box xs={10} my={2}>
                    <CurrencyTextField
                        fullWidth
                        label='Expected Budget'
                        variant='outlined'
                        currencySymbol={`${currencyInformation['symbol']}`}
                        minimumValue='0'
                        outputFormat='string'
                        decimalCharacter={`${currencyInformation['decimal']}`}
                        digitGroupSeparator={`${currencyInformation['thousand']}`}
                        onChange={(event) => handleBudgetChange(event.target.value)}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} md={5}>
                <Box xs={10} my={2}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                            fullWidth
                            disableToolbar
                            variant='inline'
                            format='MM/DD/YYYY'
                            margin='normal'
                            id='date-picker-inline'
                            label='Project start date'
                            value={projectDate}
                            onChange={handleDateChange}
                        />
                    </MuiPickersUtilsProvider>
                </Box>
            </Grid>
            <Grid item xs={12} md={5}>
                <Box xs={10} my={2}>
                    <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-helper-label'>{`Expected budget timeframe`}</InputLabel>
                        <Select
                            fullWidth
                            label={`Expected budget timeframe`}
                            id='demo-simple-select'
                            value={budgetTimeframe}
                            onChange={(event) => (handleTimeframeChange(event.target.value))}
                        >
                            {renderTimeframeOptions({ timeframes: EXPECTED_BUDGET_TIMEFRAME_OPTIONS })}
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
        </Grid>
    )
}

export default AddProjectDetails

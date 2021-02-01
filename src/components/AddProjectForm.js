import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Alert from '@material-ui/lab/Alert'
import {
    Box,
    Button,
    FormControl,
    Grid,
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
import accounting from 'accounting-js'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

import { selectCurrencyInformation } from '../scripts/selectors'
import { GET_CLIENT_INFO } from '../operations/queries/ClientQueries'
import { ADD_PROJECT } from '../operations/mutations/ProjectMutations'
import { red } from '../styles/colors.scss'

const AddProjectForm = ({
    clientId,
    history
}) => {

    const { loading: loadingClient, error: errorClient, data: dataClient } = useQuery(GET_CLIENT_INFO, {
        variables: {
            id: Number(clientId)
        }
    })

    const [addProject, { data, loading, error }] = useMutation(ADD_PROJECT, { errorPolicy: 'all' })

    const [disableAdd, setDisableAdd] = useState(true)
    const [invalidBudgetInput, setInvalidBudgetInput] = useState(false)
    const [projectName, setProjectName] = useState('')
    const [projectGithub, setProjectGithub] = useState('')
    const [createProjectError, setCreateProjectError] = useState('')
    const [projectToggl, setProjectToggl] = useState(null)
    const [projectDate, setProjectDate] = useState(null)
    const [projectBudget, setProjectBudget] = useState(0)
    const [displayError, setDisplayError] = useState(false)

    useEffect(() => {
        if (!projectName || !projectGithub || !projectDate) {
            setDisableAdd(true)
        } else {
            setDisableAdd(false)
        }
    })

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setDisplayError(false)
    }

    const handleBudgetChange = (input) => {
        setInvalidBudgetInput(false)
        const amount = Number(input.replace(/\D/g, ''))
        setProjectBudget(amount)
    }

    const handleDateChange = (date) => {
        setProjectDate(moment(date['_d']).format('YYYY-MM-DD'))
    }

    const createProject = async () => {
        const variables = {
            client_id: parseInt(clientId, 10),
            name: projectName,
            github_url: projectGithub,
            date: projectDate,
            expected_budget: parseInt(projectBudget, 10)
        }
        if (projectToggl) {
            variables['toggl_url'] = projectToggl
        }

        const newProject = await addProject({ variables })
        if (loading) return <span>loading...</span>
        if (newProject.errors) {
            setCreateProjectError(`${Object.keys(newProject.errors[0].extensions.exception.fields)[0]}`)
            setDisplayError(true)
        } else {
            history.push(`/projects/${newProject.data.createProject.id}`)
        }

    }

    if (errorClient) return 'Somenthing went wrong'
    if (loadingClient) return 'loading...'

    const currencyInformation = selectCurrencyInformation({
        currency: dataClient.getClientById.currency
    })

    return (
        <FormControl
            fullWidth
            align='left'
        >
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
                            label='Github URL'
                            id='projectGithub'
                            variant='outlined'
                            fullWidth
                            required
                            onChange={(event) => setProjectGithub(event.target.value)}
                        />
                    </Box>
                </Grid>
            </Grid>

            <Grid container justify='space-between'>
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
            </Grid>
            <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant='inline'
                        format='MM/DD/YYYY'
                        margin='normal'
                        id='date-picker-inline'
                        label=''
                        value={projectDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
                <Box mt={5}>
                    <Button
                        variant='contained'
                        color='primary'
                        disabled={disableAdd}
                        onClick={createProject}
                    >
                        Add Project
                    </Button>
                </Box>
            </Grid>
            <Snackbar
                open={displayError}
                autoHideDuration={3600}
                onClose={handleAlertClose}
            >
                <Alert severity='error'>
                    {`${createProjectError} already exists`}
                </Alert>
            </Snackbar>
        </FormControl>
    )
}

export default AddProjectForm

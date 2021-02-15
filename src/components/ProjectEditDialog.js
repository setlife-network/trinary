import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import Alert from '@material-ui/lab/Alert'
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField
} from '@material-ui/core/'
import { split } from 'lodash'
import accounting from 'accounting-js'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

import LoadingProgress from './LoadingProgress'
import {
    selectCurrencyInformation,
    verifyGithubURL,
    verifyTogglURL
} from '../scripts/selectors'
import { UPDATE_PROJECT } from '../operations/mutations/ProjectMutations'
import { EXPECTED_BUDGET_TIMEFRAME_OPTIONS } from '../constants'

const ProjectEditDialog = (props) => {

    const {
        project,
        onClose,
        open
    } = props

    const [updateProject, { data, loading, error }] = useMutation(UPDATE_PROJECT, { errorPolicy: 'all' })

    const [budgetTimeframe, setBudgetTimeframe] = useState(null)
    const [disableEdit, setDisableEdit] = useState(true)
    const [displayError, setDisplayError] = useState(false)
    const [editProjectError, setEditProjectError] = useState('')
    const [expectedBudget, setExpectedBudget] = useState(project.expected_budget)
    const [githubURL, setGithubURL] = useState(project.github_url)
    const [projectName, setProjectName] = useState(project.name)
    const [togglURL, setTogglURL] = useState(project.toggl_url)

    const onEditProject = async () => {
        if (!verifyGithubURL(githubURL)) {
            setEditProjectError('The Github URL is invalid')
            setDisplayError(true)
            return
        }
        if (togglURL) {
            if (!verifyTogglURL(togglURL)) {
                setEditProjectError('The Toggl URL is invalid')
                setDisplayError(true)
                return
            }
        }
        const projectInfoToEdit = {
            project_id: project.id,
            name: projectName,
            expected_budget: Number(expectedBudget),
            github_url: githubURL,
            expected_budget_timeframe: EXPECTED_BUDGET_TIMEFRAME_OPTIONS[budgetTimeframe].option
        }
        if (togglURL) {
            projectInfoToEdit['toggl_url'] = togglURL
        }
        const projectEdited = await updateProject({ variables: projectInfoToEdit })
        if (loading) return <LoadingProgress/>
        else if (projectEdited.errors) {
            setEditProjectError(`${Object.keys(projectEdited.errors[0].extensions.exception.fields)[0]}  already exists`)
            setDisplayError(true)
        } else {
            onClose()
        }
    }

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setDisplayError(false)
    }

    const handleBudgetChange = (input) => {
        const amount = Number(input.replace(/\D/g, ''))
        setExpectedBudget(amount)
    }

    const handleTimeframeChange = (timeframe) => {
        setBudgetTimeframe(timeframe)
    }

    useEffect(() => {
        if (
            expectedBudget == project.expected_budget &&
            githubURL == project.github_url &&
            projectName == project.name &&
            togglURL == project.toggl_url &&
            budgetTimeframe == project.expected_budget_timeframe
        ) {
            setDisableEdit(true)
        } else if (!expectedBudget || !githubURL || !projectName) {
            setDisableEdit(true)
        } else {
            setDisableEdit(false)
        }
    })

    const currencyInformation = selectCurrencyInformation({
        currency: project.client.currency
    })

    const renderTimeframeOptions = ({ timeframes }) => {
        return timeframes.map((timeframe, i) => {
            return (
                <MenuItem value={i}>
                    {`${timeframe.option}`}
                </MenuItem>
            )
        })
    }

    return (
        <Dialog
            className='ProjectEditDialog'
            onClose={onClose}
            open={open}
        >
            <Box mx={5} my={3}>
                <DialogTitle>
                    {`Edit Project`}
                </DialogTitle>
                <FormControl>
                    <Grid
                        container
                        justify='space-between'
                        alignItems='center'
                    >
                        <Grid item xs={12} lg={6}>
                            <Box my={2} pr={1}>
                                <TextField
                                    label='Project name'
                                    variant='outlined'
                                    defaultValue={project.name}
                                    fullWidth
                                    required
                                    onChange={(event) => setProjectName(event.target.value)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Box my={2} pl={1}>
                                <CurrencyTextField
                                    fullWidth
                                    label='Expected Budget'
                                    variant='outlined'
                                    currencySymbol={`${currencyInformation['symbol']}`}
                                    minimumValue='0'
                                    outputFormat='string'
                                    decimalCharacter={`${currencyInformation['decimal']}`}
                                    digitGroupSeparator={`${currencyInformation['thousand']}`}
                                    defaultValue={project.expected_budget}
                                    onChange={(event) => handleBudgetChange(event.target.value)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Box my={2} pr={1}>
                                <TextField
                                    label='Github URL'
                                    variant='outlined'
                                    type='url'
                                    defaultValue={project.github_url}
                                    fullWidth
                                    onChange={(event) => setGithubURL(event.target.value)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Box my={2}>
                                <TextField
                                    label='Toggl URL'
                                    variant='outlined'
                                    type='url'
                                    defaultValue={project.toggl_url}
                                    fullWidth
                                    onChange={(event) => setTogglURL(event.target.value)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Box mb={2}>
                                <FormControl fullWidth>
                                    <InputLabel id='demo-simple-select-helper-label'>{`Expected budget timeframe`}</InputLabel>
                                    <Select
                                        fullWidth
                                        label={`Expected budget timeframe`}
                                        id='demo-simple-select'
                                        value={budgetTimeframe}
                                        defaultValue={project.expected_budget_timeframe}
                                        onChange={(event) => (handleTimeframeChange(event.target.value))}
                                    >
                                        {renderTimeframeOptions({ timeframes: EXPECTED_BUDGET_TIMEFRAME_OPTIONS })}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={7}>
                            <Box mt={5} pl={1}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    disabled={disableEdit}
                                    onClick={onEditProject}
                                >
                                    {`Edit Project`}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Snackbar
                        open={displayError}
                        autoHideDuration={3600}
                        onClose={handleAlertClose}
                    >
                        <Alert severity='error'>
                            {`${editProjectError}`}
                        </Alert>
                    </Snackbar>
                </FormControl>
            </Box>
        </Dialog>
    )
}

export default ProjectEditDialog

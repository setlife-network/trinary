import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import {
    Avatar,
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

import AddGithubProjectManually from './AddGithubProjectManually'
import AddProjectDetails from './AddProjectDetails'
import AddProjectFromGithub from './AddProjectFromGithub'
import LoadingProgress from './LoadingProgress'

import {
    verifyGithubURL,
    verifyTogglURL
} from '../scripts/selectors'
import { EXPECTED_BUDGET_TIMEFRAME_OPTIONS } from '../constants'
import { GET_CLIENT_INFO } from '../operations/queries/ClientQueries'
import { ADD_PROJECT } from '../operations/mutations/ProjectMutations'

const AddProjectForm = (props) => {

    const {
        clientId
    } = props

    const history = useHistory()

    const {
        error: errorClient,
        data: dataClient,
        loading: loadingClient
    } = useQuery(GET_CLIENT_INFO, {
        variables: {
            id: Number(clientId)
        }
    })

    const [
        addProject,
        {
            data,
            loading,
            error
        }] = useMutation(ADD_PROJECT, {
        errorPolicy: 'all'
    })

    const [budgetTimeframe, setBudgetTimeframe] = useState(null)
    const [createProjectError, setCreateProjectError] = useState(null)
    const [disableAdd, setDisableAdd] = useState(true)
    const [displayError, setDisplayError] = useState(false)
    const [linkedRepo, setLinkedRepo] = useState(false)
    const [projectBudget, setProjectBudget] = useState(0)
    const [projectDate, setProjectDate] = useState(null)
    const [projectGithub, setProjectGithub] = useState(null)
    const [projectGithubManual, setProjectGithubManual] = useState(null)
    const [projectName, setProjectName] = useState('')
    const [projectToggl, setProjectToggl] = useState(null)

    useEffect(() => {
        if (!projectName || !projectGithub || !projectDate || budgetTimeframe == null) {
            setDisableAdd(true)
        } else {
            setDisableAdd(false)
        }
    })

    useEffect(() => {
        //if there's not a linked github repo from the selector use the one inserted manually if exists
        if (projectGithubManual && !projectGithub) {
            setProjectGithub(projectGithubManual)
        }
    }, [projectGithub, projectGithubManual])
    const createProject = async () => {
        if (!verifyGithubURL(projectGithub)) {
            setCreateProjectError('The Github URL is invalid')
            setDisplayError(true)
            return
        }
        if (projectToggl) {
            if (!verifyTogglURL(projectToggl)) {
                setCreateProjectError('The Toggl URL is invalid')
                setDisplayError(true)
                return
            }
        }
        const variables = {
            client_id: Number(clientId),
            name: projectName,
            github_url: projectGithub,
            date: projectDate,
            expected_budget: Number(projectBudget),
            expected_budget_timeframe: EXPECTED_BUDGET_TIMEFRAME_OPTIONS[budgetTimeframe].value
        }
        if (projectToggl) {
            variables.toggl_url = projectToggl
        }
        const newProject = await addProject({ variables })
        if (loading) return <LoadingProgress/>
        if (newProject.errors) {
            setCreateProjectError(`${Object.keys(newProject.errors[0].extensions.exception.fields)[0]} already exists`)
            setDisplayError(true)
        } else {
            history.push(`/projects/${newProject.data.createProject.id}`)
        }
    }

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setDisplayError(false)
    }

    if (errorClient) return `An error ocurred: ${errorClient}`
    if (loadingClient) return <LoadingProgress/>

    const { getClientById: client } = dataClient

    return (
        <Grid
            container
            alignItems='center'
            className='AddProjectForm'
        >
            <Grid item>
                <Box mr={2} mb={2}>
                    <Avatar>
                        {`1`}
                    </Avatar>
                </Box>
            </Grid>
            <Grid item>
                <Typography variant='h6'>
                    {`Link the Github Project`}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Box item mb={3}>
                    <AddProjectFromGithub
                        clientId={clientId}
                        setLinkedRepo={setLinkedRepo}
                        setProjectGithub={setProjectGithub}
                    />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box item mb={3}>
                    <AddGithubProjectManually
                        linkedRepo={linkedRepo}
                        projectGithub={projectGithub}
                        setProjectGithub={setProjectGithub}
                        setProjectGithubManual={setProjectGithubManual}
                    />
                </Box>
            </Grid>
            <Grid item>
                <Box mr={3} mb={2}>
                    <Avatar>
                        {`2`}
                    </Avatar>
                </Box>
            </Grid>
            <Grid item>
                <Typography variant='h6'>
                    {`Add additional information`}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Box item mt={5}>
                    <AddProjectDetails
                        budgetTimeframe={budgetTimeframe}
                        client={client}
                        projectDate={projectDate}
                        setBudgetTimeframe={setBudgetTimeframe}
                        setProjectDate={setProjectDate}
                        setProjectName={setProjectName}
                        setProjectToggl={setProjectToggl}
                        setProjectBudget={setProjectBudget}
                    />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box mt={5}>
                    <Button
                        variant='contained'
                        color='primary'
                        disabled={disableAdd}
                        onClick={createProject}
                    >
                        <Box px={5}>
                            {`Add Project`}
                        </Box>
                    </Button>
                </Box>
            </Grid>
            <Snackbar
                open={displayError}
                autoHideDuration={4000}
                onClose={handleAlertClose}
            >
                <Alert severity='error'>
                    {`${createProjectError}`}
                </Alert>
            </Snackbar>
        </Grid>
    )
}

export default AddProjectForm

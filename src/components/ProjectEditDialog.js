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
    MenuItem,
    Select,
    Snackbar,
    TextField
} from '@material-ui/core/'

import { UPDATE_PROJECT } from '../operations/mutations/ProjectMutations'

const ProjectEditDialog = (props) => {

    const {
        project,
        onClose,
        open
    } = props

    const [updateProject, { data, loading, error }] = useMutation(UPDATE_PROJECT, { errorPolicy: 'all' })

    const [disableEdit, setDisableEdit] = useState(true)
    const [displayError, setDisplayError] = useState(false)
    const [editProjectError, setEditProjectError] = useState('')
    const [expectedBudget, setExpectedBudget] = useState(project.expected_budget)
    const [githubURL, setGithubURL] = useState(project.github_url)
    const [projectName, setProjectName] = useState(project.name)
    const [togglURL, setTogglURL] = useState(project.toggl_url)

    const onEditProject = async () => {
        const projectInfoToEdit = {
            project_id: project.id,
            name: projectName,
            expected_budget: Number(expectedBudget),
            github_url: githubURL
        }
        if (togglURL) {
            projectInfoToEdit['toggl_url'] = togglURL
        }
        const projectEdited = await updateProject({ variables: projectInfoToEdit })
        if (loading) return <span>loading...</span>
        else if (projectEdited.errors) {
            setEditProjectError(`${Object.keys(projectEdited.errors[0].extensions.exception.fields)[0]}`)
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

    useEffect(() => {
        if (
            expectedBudget == project.expected_budget &&
            githubURL == project.github_url &&
            projectName == project.name &&
            togglURL == project.toggl_url
        ) {
            setDisableEdit(true)
        } else if (!expectedBudget || !githubURL || !projectName) {
            setDisableEdit(true)
        } else {
            setDisableEdit(false)
        }
    })

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
                                <TextField
                                    label='Expected Budget'
                                    variant='outlined'
                                    type='number'
                                    defaultValue={project.expected_budget}
                                    fullWidth
                                    onChange={(event) => setExpectedBudget(event.target.value)}
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
                            {`${editProjectError} already exists`}
                        </Alert>
                    </Snackbar>
                </FormControl>
            </Box>
        </Dialog>
    )
}

export default ProjectEditDialog

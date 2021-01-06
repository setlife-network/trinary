import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
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
    TextField
} from '@material-ui/core/'

import { UPDATE_PROJECT } from '../operations/mutations/ProjectMutations'

const ProjectEditDialog = (props) => {

    const {
        project,
        onClose,
        open
    } = props

    const [updateProject, { data, loading, error }] = useMutation(UPDATE_PROJECT)

    console.log('project');
    console.log(project);

    const [projectName, setProjectName] = useState(project.name)
    const [expectedBudget, setExpectedBudget] = useState(project.expected_budget)
    const [githubURL, setGithubURL] = useState(project.github_url)
    const [togglURL, setTogglURL] = useState(project.toggl_url)
    const [disableEdit, setDisableEdit] = useState(true)

    const onEdit = async () => {
        const projectInfoToEdit = {
            project_id: project.id,
            name: projectName,
            expected_budget: Number(expectedBudget),
            github_url: githubURL
        }
        if (togglURL) {
            projectInfoToEdit['toggl_url'] = togglURL
        }
        updateProject({
            variables: projectInfoToEdit
        })
        onClose()
    }

    useEffect(() => {
        if (projectName || expectedBudget || githubURL) {
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
                        <Grid item xs={12} lg={5}>
                            <Box my={2}>
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
                        <Grid item xs={12} lg={5}>
                            <Box my={2}>
                                <TextField
                                    label='Github URL'
                                    variant='outlined'
                                    defaultValue={project.github_url}
                                    fullWidth
                                    onChange={(event) => setGithubURL(event.target.value)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={5}>
                            <Box my={2}>
                                <TextField
                                    label='Expected Budget'
                                    variant='outlined'
                                    defaultValue={project.expected_budget}
                                    fullWidth
                                    onChange={(event) => setExpectedBudget(event.target.value)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={5}>
                            <Box my={2}>
                                <TextField
                                    label='Toggl URL'
                                    variant='outlined'
                                    defaultValue={project.toggl_url}
                                    fullWidth
                                    onChange={(event) => setTogglURL(event.target.value)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box mt={5}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    disabled={disableEdit}
                                    onClick={onEdit}
                                >
                                    {`Edit client`}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </FormControl>
            </Box>
        </Dialog>
    )
}

export default ProjectEditDialog

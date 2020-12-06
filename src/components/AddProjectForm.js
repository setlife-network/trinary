import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

import { CREATE_CLIENT } from '../operations/mutations/ClientMutations'

const AddProjectForm = ({
    history
}) => {

    const [addProject, { data, loading, error }] = useMutation(CREATE_CLIENT)

    const [projectName, setProjectName] = useState('');
    const [projectGithub, setProjectGithub] = useState('');
    const [projectToggl, setProjectToggl] = useState('');
    const [projectBudget, setProjectBudget] = useState(0);
    const [disableAdd, setDisableAdd] = useState(true);

    const onAdd = async () => {
        // const newProject = await addClient({
        //     variables: {
        //         name: projectName,
        //         email: clientEmail,
        //         currency: clientCurrency
        //     }
        // })
        history.push(``)
    }

    useEffect(() => {
        if (projectName && projectGithub && projectBudget) {
            setDisableAdd(false)
        }
    })

    return (
        <FormControl
            fullWidth
            noValidate
            autoComplete='off'
            align='left'
        >
            <Grid
                container
                justify='space-between'
                alignItems='center'
            >

                <Grid item xs={5}>
                    <TextField
                        label='Project name'
                        id='projectName'
                        variant='outlined'
                        fullWidth
                        onChange={(event) => setProjectName(event.target.value)}
                    />
                </Grid>

                <Grid item xs={5}>
                    <TextField
                        label='Github URL'
                        id='projectGithub'
                        variant='outlined'
                        fullWidth
                        onChange={(event) => setProjectGithub(event.target.value)}
                    />
                </Grid>

                <Grid item xs={5}>
                    <TextField
                        label='Toggl URL'
                        id='projectToggl'
                        variant='outlined'
                        fullWidth
                        onChange={(event) => setProjectToggl(event.target.value)}
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        label='Expected Budget'
                        id='projectBudget'
                        variant='outlined'
                        fullWidth
                        onChange={(event) => setProjectBudget(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box mt={5}>
                        <Button
                            variant='contained'
                            color='primary'
                            disabled={disableAdd}
                            onClick={() => (onAdd())}
                        >
                            Add Project
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </FormControl>
    )
}

export default AddProjectForm

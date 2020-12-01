import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { gql, useQuery } from '@apollo/client';

import { GET_ACTIVE_PROJECTS_COUNT } from '../operations/queries/ProjectQueries'

const ProjectsListManager = ({
    history
}) => {

    const addClient = () => {
        history.push('/client/add')
    }

    const { loading, error, data } = useQuery(GET_ACTIVE_PROJECTS_COUNT);

    if (loading) {
        return (
            <Grid item xs={12}>
                Loading...
            </Grid>
        )
    }
    if (error) return `Error! ${error.message}`;
    console.log('data');
    console.log(data);
    return (
        <Box mb={3} mx={2} className='ClientListManager'>
            <Grid container direction='row' justify='space-between' alignItems='flex-end'>
                <Grid item>
                    <Box
                        bgcolor='primary.black'
                        color='primary.light'
                        borderRadius='borderRadius'
                        px={5}
                        py={1}
                    >
                        {
                            `${data.getActiveProjectsCount} active ${data.getActiveProjectsCount == 1
                                ? 'project'
                                : 'projects'}
                            `
                        }
                    </Box>
                </Grid>
                <Grid item>
                    <Fab
                        color='primary'
                        onClick={() => addClient()}
                    >
                        <AddIcon color='action'/>
                    </Fab>
                </Grid>
            </Grid>
        </Box>

    )
}

export default ProjectsListManager

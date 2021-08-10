import React from 'react'
import {
    Box,
    Grid,
    Typography,
    Link
} from '@material-ui/core'
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../operations/queries/ProjectQueries';

const GithubAccessBlocked = (props) => {

    const githubURL = props.githubURL

    const {
        data: dataProject,
        loading: loadingProject,
        error: errorProject,
    } = useQuery(GET_PROJECT, {
        variables: {
            id: Number(props.projectId)
        }
    })

    const projectURL = dataProject.getProjectById.github_url

    return (
        <Grid container className='GithubAccessBlocked'>
            <Grid item xs={12}>
                <Box my={[2, 5]} >
                    <Typography align='center' variant='h6'>
                        {props.message}
                    </Typography>
                    <Typography align='center' variant='h6'>
                        <Link href={projectURL}>
                            Github URL
                        </Link>
                    </Typography>
                    <Typography align='center' variant='h6'>
                        Please go to
                        <Link href='https://github.com/settings/connections/applications/477caaee77097be3982d'>
                            &nbsp;this link&nbsp;
                        </Link>
                        so you can request or give access.
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default GithubAccessBlocked

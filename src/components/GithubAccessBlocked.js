import React from 'react'
import {
    Box,
    Grid,
    Typography,
    Link
} from '@material-ui/core'

const GithubAccessBlocked = (props) => {

    const githubURL = props.githubURL

    return (
        <Grid container className='GithubAccessBlocked'>
            <Grid item xs={12}>
                <Box my={[2, 5]} >
                    <Typography align='center' variant='h6'>
                        {props.message}
                    </Typography>
                    <Typography align='center' variant='h6'>
                        Please go to
                        <Link href='https://github.com/settings/connections/applications/477caaee77097be3982d'>
                            &nbsp;this&nbsp;
                        </Link>
                        link so you can request or give access.
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default GithubAccessBlocked

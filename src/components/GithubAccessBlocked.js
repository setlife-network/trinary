import React from 'react'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'

const GithubAccessBlocked = (props) => {
    return (
        <Grid container className='GithubAccessBlocked'>
            <Grid item xs={12}>
                <Box my={[2, 5]} >
                    <Typography align='center' variant='h6'>
                        {props.message}
                    </Typography>
                    <Typography align='center'>
                        {
                            //TODO: set instructions message
                            ``
                        }
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default GithubAccessBlocked

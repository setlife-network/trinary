import React, { useState } from 'react'
import {
    Box,
    Grid,
    TextField,
    Typography
} from '@material-ui/core'

const AddGithubProjectManually = (props) => {

    const {
        linkedRepo,
        projectGithub,
        setProjectGithub,
        setProjectGithubManual
    } = props

    return (
        <Grid container justify='space-between' classname='AddGithubProjectManually'>
            <Grid item xs={12} align='left'>
                <Box my={3}>
                    <Typography>
                        {`Or add it manually`}
                    </Typography>
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
                        disabled={linkedRepo}
                        onChange={(event) => setProjectGithubManual(event.target.value)}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

export default AddGithubProjectManually

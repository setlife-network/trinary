import React from 'react'
import {
    Box,
    Grid,
    TextField,
    Typography
} from '@material-ui/core'

const AddGithubProjectManually = (props) => {

    const {
        setProjectGithubManual
    } = props

    return (
        <Grid container justifyContent='space-between' classname='AddGithubProjectManually'>
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
                        onChange={(event) => setProjectGithubManual(event.target.value)}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

export default AddGithubProjectManually

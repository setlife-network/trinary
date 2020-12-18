import React from 'react'

import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'

const ContributorTimeEntry = (props) => {

    const { timeEntry } = props

    return (
        <Grid container>
            <Grid item>
                <Typography>
                    {'Contributor name'}
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                    {'XXh.'}
                </Typography>
            </Grid>
            <Grid item>
                <hr/>
            </Grid>
        </Grid>
    )
}

export default ContributorTimeEntry

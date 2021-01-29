import React, { useState } from 'react'
import {
    Grid,
    Backdrop,
    CircularProgress
} from '@material-ui/core'

const LoadingProgress = (props) => {
    return (
        <Grid container className='LoadingProgress'>
            <Grid item xs={12}>
                <Backdrop open>
                    <CircularProgress/>
                </Backdrop>
            </Grid>
        </Grid>
    )
}

export default LoadingProgress

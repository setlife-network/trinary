import React from 'react'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'

import { lightGrey } from '../styles/colors.scss'

const ContributorTimeEntry = (props) => {

    const { timeEntry } = props

    return (
        <Grid container className='ContributorTimeEntry'>
            <Grid item xs={6} align='left'>
                <Typography>
                    {'Contributor name'}
                </Typography>
            </Grid>
            <Grid item xs={6} align='right'>
                <Typography>
                    {'XXh.'}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <hr color={lightGrey}/>
            </Grid>
        </Grid>
    )
}

export default ContributorTimeEntry

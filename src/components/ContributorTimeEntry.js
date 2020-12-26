import React from 'react'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'

import { lightGrey } from '../styles/colors.scss'

const ContributorTimeEntry = (props) => {

    const { timeEntry } = props

    const timeSpent = (timeEntry.seconds / 3600).toString().split('.')
    const hoursSpent = timeSpent[0]
    const minutesSpent = timeSpent[1].substring(0, 2)

    return (
        <Grid container className='ContributorTimeEntry'>
            <Grid item xs={6} align='left'>
                <Typography>
                    {`${timeEntry.contributor.name}`}
                </Typography>
            </Grid>
            <Grid item xs={6} align='right'>
                <Typography>
                    {`${hoursSpent} h. ${minutesSpent} m.`}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <hr color={lightGrey}/>
            </Grid>
        </Grid>
    )
}

export default ContributorTimeEntry

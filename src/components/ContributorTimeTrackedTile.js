import React from 'react'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'

import { lightGrey } from '../styles/colors.scss'

const ContributorTimeTrackedTile = (props) => {

    const { timeEntry } = props

    const hoursSpent = Math.trunc(timeEntry.seconds / 3600)
    const minutesSpent = Math.trunc(timeEntry.seconds / 60)

    return (
        <Grid container className='ContributorTimeEntry'>
            <Grid item xs={6} align='left'>
                <Typography>
                    {`${timeEntry.contributor.name}`}
                </Typography>
            </Grid>
            <Grid item xs={6} align='right'>
                <Typography>
                    {`
                        ${hoursSpent ? `${hoursSpent} h` : `${minutesSpent} m`}
                    `}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <hr color={lightGrey}/>
            </Grid>
        </Grid>
    )
}

export default ContributorTimeTrackedTile

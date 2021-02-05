import React from 'react'
import { useHistory } from 'react-router-dom'
import {
    Box,
    Grid
} from '@material-ui/core'

import { LOGO_URL } from '../constants'

const Navigation = (props) => {
    const history = useHistory()

    const redirectToHome = () => {
        history.push('/')
    }

    return (
        <Grid container className='Navigation'>
            <Grid item xs={12} sm={3}>
                <Box my={2} align='center'>
                    <img
                        src={LOGO_URL}
                        alt='Home'
                        onClick={() => redirectToHome()}
                        className='icon-image'
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

export default Navigation

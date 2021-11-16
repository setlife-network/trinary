import React from 'react'
import {
    Grid,
    Button,
    Box,
    Typography
} from '@material-ui/core'

import { white } from '../styles/colors.scss'

const Logout = () => {
    return (
        <Grid container className='Logout'>
            <Grid xs={12} align='center'>
                <Button
                    variant='contained'
                    color='primary'
                >
                    <Box color={`${white}`}>
                        <Typography>
                            {'Logout'}
                        </Typography>
                    </Box>
                </Button>
            </Grid>
        </Grid>
    )
}

export default Logout
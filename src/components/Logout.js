import React from 'react'
import {
    Grid,
    Button,
    Box,
    Typography
} from '@material-ui/core'
import LogoutIcon from '@material-ui/icons/ExitToApp'

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
                        <Grid container>
                            <Grid item auto>
                                <Box mr={1} mt={1}>
                                    <LogoutIcon />
                                </Box>
                            </Grid>
                            <Grid item auto>
                                <Typography>
                                    <Box mr={1} mt={1}>
                                        {'Logout'}
                                    </Box>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Button>
            </Grid>
        </Grid>
    )
}

export default Logout
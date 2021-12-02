import React from 'react'
import { useHistory } from 'react-router-dom'
import {
    Grid,
    Button,
    Box,
    Typography
} from '@material-ui/core'
import LogoutIcon from '@material-ui/icons/ExitToApp'

import { white } from '../styles/colors.scss'
import { API_ROOT } from '../constants'

const Logout = () => {

    const test = () => {
        const config = {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        }
        fetch(`${API_ROOT}/logout`, config)
            .then(response => {
                console.log(response)
                return window.location.reload()
            })
    }

    return (
        <Grid container className='Logout'>
            <Grid xs={12} align='center'>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => test()}
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
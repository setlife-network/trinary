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

    const history = useHistory()

    const redirectToLogin = () => {
        history.push('/login')
    }

    const test = (e) => {
        const config = {
            method: 'GET'
        }
        fetch(`${API_ROOT}/logout`, config)
            .then(response => {
                console.log('response')
                console.log(response)
                return response
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
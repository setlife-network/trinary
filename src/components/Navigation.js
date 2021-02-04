import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useReactiveVar } from '@apollo/client'
import {
    AppBar,
    Box,
    Grid
} from '@material-ui/core'
import { split } from 'lodash'

import { lightBlue } from '../styles/colors.scss'
import { LOGO_URL } from '../constants'
import { capitalizeWord, matchTitlePage } from '../scripts/selectors'
import { pageName } from '../reactivities/variables'

const Navigation = (props) => {

    const history = useHistory()
    const redirectToHome = () => {
        history.push('/')
    }
    const location = useLocation()
    const locationTitle = matchTitlePage({ location: location.pathname })
    const optionalLocationTitle = useReactiveVar(pageName)

    return (
        <Box bgcolor={lightBlue} mb={5}>
            <AppBar className='Navigation' position='sticky' color='transparent'>
                <Grid container>
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
                    <Grid item xs={12} sm={6}>
                        <h2>
                            {
                                capitalizeWord({
                                    word: locationTitle.title || optionalLocationTitle
                                })
                            }
                        </h2>
                    </Grid>
                </Grid>

            </AppBar>
        </Box>

    )
}

export default Navigation

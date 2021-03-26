import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useReactiveVar } from '@apollo/client'
import {
    AppBar,
    Box,
    Grid
} from '@material-ui/core'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { split } from 'lodash'

import { lightBlue } from '../styles/colors.scss'
import { LOGO_URL, SMALL_LOGO_URL } from '../constants'
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
            <AppBar className='Navigation' position='sticky' color='white'>
                <Grid container>
                    <Grid item xs={2} sm={3}>
                        <Box mt={2} align='center' onClick={() => redirectToHome()}>
                            {props.width == 'xs'
                                ? (
                                    <img
                                        src={SMALL_LOGO_URL}
                                        alt='Logo'
                                        className='icon-image'
                                    />
                                ) : (
                                    <img
                                        src={LOGO_URL}
                                        alt='Logo'
                                        className='icon-image'
                                    />
                                )
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={8} sm={6}>
                        <h2 className='navigation-title'>
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

export default withWidth()(Navigation)

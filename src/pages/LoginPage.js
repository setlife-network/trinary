import React, { useState, useEffect } from 'react'
import GitHubIcon from '@material-ui/icons/GitHub'
import Button from '@material-ui/core/Button'

import { API_ROOT } from '../constants'
import Grid from '@material-ui/core/Grid'
import Header from '../components/Header'
import { setlifeBlue } from '../styles/colors.scss'
import { pageName } from '../reactivities/variables'

const loggedInUser = [{
    id: null,
    email: ''
}]

class LoginPage extends React.Component {

    handleGithubLogin = () => {
        window.open(`${API_ROOT}/login`, '_self')
    }

    render() {
        pageName('LogIn')
        return (
            <Grid container className='LoginPage'>
                <Grid item xs={12}>
                    {// <Header
                    //     title='Login'
                    // />
                    }
                </Grid>
                <div className='image-button'>
                    {loggedInUser.id !== null && (
                        <Button
                            onClick={this.handleGithubLogin}
                            variant='contained'
                            color='primary'
                            href='#contained-buttons'
                            style={{ backgroundColor: setlifeBlue }}
                        >
                            <h3>{`Log in with your Github Account`}</h3>
                            <GitHubIcon className='githubIcon' />
                        </Button>
                    )}
                </div>

            </Grid>
        )
    }
}

export default LoginPage

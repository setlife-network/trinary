import React from 'react'
import GitHubIcon from '@material-ui/icons/GitHub'
import Button from '@material-ui/core/Button'

import { API_ROOT } from '../constants'
import Grid from '@material-ui/core/Grid'
import colors from '../styles/colors.module.scss'

const { setlifeBlue } = colors

const loggedInUser = [{
    id: null,
    email: ''
}]

class LoginPage extends React.Component {

    handleGithubLogin = () => {
        window.open(`${API_ROOT}/login`, '_self')
    }

    render() {
        return (
            <Grid container className='LoginPage'>
                <div className='image-button'>
                    {loggedInUser.id !== null && (
                        <Button
                            onClick={this.handleGithubLogin}
                            variant='contained'
                            color='primary'
                            href='#contained-buttons'
                            style={{ backgroundColor: setlifeBlue }}
                            data-testid='login-button'
                        >
                            <h3 data-testid='login-button-text'>{`Log in with your Github Account`}</h3>
                            <GitHubIcon className='githubIcon' />
                        </Button>
                    )}
                </div>

            </Grid>
        )
    }
}

export default LoginPage

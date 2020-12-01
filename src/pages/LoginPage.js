import React, { useState, useEffect } from 'react'
import GitHubIcon from '@material-ui/icons/GitHub'
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom'

import { API_ROOT } from '../constants'

import { ReactComponent as ReactImg } from '../images/sample.svg'

function LoginPage({
    history
}) {

    const [loggedInUser, setLoggedInUser] = useState({
        id: null,
        email: '',
    })

    const handleGithubLogin = () => {
        window.open(`${API_ROOT}/login`, '_self')
    }

    return (
        <div className='LoginPage'>
            <ReactImg className='image' />
            <span>
                <h2>Welcome to Trinary</h2>
            </span>
            <div className='image-button'>
                {loggedInUser.id === null && (
                    <Button
                        onClick={handleGithubLogin}
                        variant='contained'
                        color='primary'
                        href='#contained-buttons'
                    >
                        <h3>Log in with your Github Account</h3>
                        <GitHubIcon className='githubIcon' />
                    </Button>
                )}
            </div>
        </div>
    )
}

export default LoginPage

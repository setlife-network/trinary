import React from 'react'
import { Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import './styles/App.scss'
import theme from './styles/theme'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

const App = () => {
    return (
        <div className='App'>
            <ThemeProvider theme={theme}>
                <Route
                    path='/'
                    render={(props) => <LoginPage {...props} />}
                />
            </ThemeProvider>
        </div>
    )
}

export default App

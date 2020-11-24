import React from 'react'
import { Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'

import theme from './styles/theme'

import AddClientPage from './pages/AddClientPage'
import AddProjectPage from './pages/AddProjectPage'
import ClientDetailPage from './pages/ClientDetailPage'
import ClientsListPage from './pages/ClientsListPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProjectDetailPage from './pages/ProjectDetailPage'

import Navigation from './components/Navigation'

import { API_ROOT } from './constants'

class App extends React.Component {

    // componentDidMount() {
    //     console.log('reloading');
    //     window.open(`${API_ROOT}/login`, '_self')
    // }

    render() {
        return (
            <div className='App'>
                <ThemeProvider theme={theme}>
                    <Navigation/>
                    <Route
                        exact
                        path='/'
                        render={(props) => <HomePage {...props} />}
                    />
                    <Route
                        path='/login'
                        render={(props) => <LoginPage {...props} />}
                    />
                    <Route
                        exact
                        path='/clients'
                        render={(props) => <ClientsListPage {...props} />}
                    />
                    <Route
                        path='/clients/:clientId'
                        render={(props) => <ClientDetailPage {...props} />}
                    />
                    <Route
                        path='/client/add'
                        render={(props) => <AddClientPage {...props} />}
                    />
                    <Route
                        path='/projects/:projectId'
                        render={(props) => <ProjectDetailPage {...props} />}
                    />
                    <Route
                        path='/project/add'
                        render={(props) => <AddProjectPage {...props} />}
                    />
                </ThemeProvider>
            </div>
        )
    }
}

export default App

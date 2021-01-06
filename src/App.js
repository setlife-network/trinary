import React from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'

import theme from './styles/theme'

import AddClientPage from './pages/AddClientPage'
import AddProjectPage from './pages/AddProjectPage'
import Authentication from './components/Authentication'
import ClientDetailPage from './pages/ClientDetailPage'
import ClientsListPage from './pages/ClientsListPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Navigation from './components/Navigation'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ProjectsListPage from './pages/ProjectsListPage'

import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'

import { API_ROOT } from './constants'

class App extends React.Component {

    render() {
        return (
            <div className='App'>
                <Authentication/>
                <Navigation/>
                <ThemeProvider theme={theme}>
                    <PrivateRoute
                        exact
                        path={['/home', '/']}
                        component={() => <Redirect to={`/home/clients`} />}
                    />
                    <PrivateRoute
                        path='/home/:list'
                        render={(props) => <HomePage {...props} />}
                    />
                    <PublicRoute
                        restricted
                        component={LoginPage}
                        path='/login'
                    />
                    <PrivateRoute
                        path='/clients/:clientId'
                        render={(props) => <ClientDetailPage {...props} />}
                    />
                    <PrivateRoute
                        path='/client/add'
                        render={(props) => <AddClientPage {...props} />}
                    />
                    <PrivateRoute
                        path='/projects/:projectId'
                        render={(props) => <ProjectDetailPage {...props} />}
                    />
                    <PrivateRoute
                        path='/project/add/:clientId'
                        render={(props) => <AddProjectPage {...props} />}
                    />
                </ThemeProvider>
            </div>
        )
    }
}

export default withRouter(App)

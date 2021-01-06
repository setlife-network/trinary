import React from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'

import theme from './styles/theme'

import { API_ROOT } from './constants'
import Authentication from './components/Authentication'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import AddClientPage from './pages/AddClientPage'
import AddProjectPage from './pages/AddProjectPage'
import ClientDetailPage from './pages/ClientDetailPage'
import ClientsListPage from './pages/ClientsListPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Navigation from './components/Navigation'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ProjectsListPage from './pages/ProjectsListPage'

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
                        component={HomePage}
                    />
                    <PublicRoute
                        restricted
                        path='/login'
                        component={LoginPage}
                    />
                    <PrivateRoute
                        path='/clients/:clientId'
                        component={ClientDetailPage}
                    />
                    <PrivateRoute
                        path='/client/add'
                        component={AddClientPage}
                    />
                    <PrivateRoute
                        path='/projects/:projectId'
                        component={ProjectDetailPage}
                    />
                    <PrivateRoute
                        path='/project/add/:clientId'
                        component={AddProjectPage}
                    />
                </ThemeProvider>
            </div>
        )
    }
}

export default withRouter(App)

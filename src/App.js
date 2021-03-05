import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'

import theme from './styles/theme'

import { IS_PRODUCTION } from './constants'

import AddClientPage from './pages/AddClientPage'
import AddProjectPage from './pages/AddProjectPage'
import ClientDetailPage from './pages/ClientDetailPage'
import ContributorDetailPage from './pages/ContributorDetailPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import AddPaymentPage from './pages/AddPaymentPage'
import ProjectDetailPage from './pages/ProjectDetailPage'

import Authentication from './components/Authentication'
import Navigation from './components/Navigation'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import SwipeableNavigation from './components/SwipeableNavigation'

class App extends React.Component {

    render() {

        return (
            <div className='App'>
                <Authentication/>
                <Navigation/>
                {!IS_PRODUCTION &&
                    <SwipeableNavigation/>
                }
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
                        exact
                        path='/clients/:clientId'
                        component={ClientDetailPage}
                    />
                    <PrivateRoute
                        path='/client/add'
                        component={AddClientPage}
                    />
                    <PrivateRoute
                        path='/clients/:clientId/payments/add'
                        component={AddPaymentPage}
                    />
                    <PrivateRoute
                        path='/projects/:projectId'
                        component={ProjectDetailPage}
                    />
                    <PrivateRoute
                        path='/project/add/:clientId'
                        component={AddProjectPage}
                    />
                    <PrivateRoute
                        path='/contributor/:contributorId'
                        component={ContributorDetailPage}
                    />
                </ThemeProvider>
            </div>
        )
    }
}

export default withRouter(App)

import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute'

import Footer from './components/Footer'

import DashboardPage from './pages/DashboardPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import OnboardingPage from './pages/OnboardingPage'
import OnboardingContributorPage from './pages/OnboardingContributorPage'

class App extends React.Component {
    render() {
        return (
            <div className='App'>
                <div className='content pb-24'>
                    <PublicRoute
                        path='/'
                        component={LandingPage}
                        exact
                    />
                    <PublicRoute
                        path='/login'
                        component={LoginPage}
                        exact
                    />
                    <PrivateRoute
                        exact
                        path='/dashboard'
                        component={DashboardPage}
                    />
                    <PrivateRoute
                        exact
                        path='/onboarding'
                        component={OnboardingPage}
                    />
                    <PrivateRoute
                        exact
                        path='/onboarding-contributor'
                        component={OnboardingContributorPage}
                    />
                </div>
                <Footer/>
            </div>
        )
    }
}

export default withRouter(App)

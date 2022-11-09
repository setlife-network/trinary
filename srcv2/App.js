import React from 'react'
import { withRouter } from 'react-router-dom'
import PublicRoute from './components/PublicRoute'

import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'

class App extends React.Component {
    render() {
        return (
            <div className='App'>
                <div className='content pb-24'>
                    <PublicRoute
                        path='/login'
                        component={LoginPage}
                        exact
                    />
                    <PublicRoute
                        path='/'
                        component={LandingPage}
                        exact
                    />
                </div>
                <Footer/>
            </div>
        )
    }
}

export default withRouter(App)

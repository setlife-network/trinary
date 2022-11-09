import React from 'react'
import { withRouter } from 'react-router-dom'
import PublicRoute from './components/PublicRoute'

import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'

class App extends React.Component {
    render() {
        return (
            <div className='App'>
                <PublicRoute
                    path='/'
                    component={LandingPage}
                />
                <Footer/>
            </div>
        )
    }
}

export default withRouter(App)

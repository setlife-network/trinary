import React from 'react'
import { Route, useHistory } from 'react-router-dom'
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

    async componentDidMount() {
        //const history = useHistory();
        console.log('document.cookie');
        console.log(document.cookie);
        const loggedInUser = await fetch(`${API_ROOT}/check-session`, {
            credentials: 'include'
        })
        console.log('loggedInUser');
        console.log(loggedInUser);
        if (loggedInUser.status == 200) {
            const loggedInUserJSON = await loggedInUser.json()
            console.log('loggedInUserJSON');
            console.log(loggedInUserJSON);
            console.log('loggedInUserJSON.result');
            console.log(loggedInUserJSON.result);

            if (loggedInUserJSON.result == 1) {
                //push to home
                console.log('home');
            } else {
                console.log('login');
            }
            //push to login
            //history.push('/login')
        }

    }

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

import React from 'react';
import { Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './styles/theme'

import HomePage from './pages/HomePage'

const App = () => {
    return (
        <div className='App'>
            <ThemeProvider theme={theme}>
                <Route
                    path='/'
                    render={(props) => <HomePage {...props}/>}
                />
            </ThemeProvider>
        </div>
    );
}

export default App;

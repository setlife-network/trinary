import React from 'react';
import { Route } from 'react-router-dom';

import HomePage from './pages/HomePage'

import logo from './logo.svg';

const App = () => {
    return (
        <div className='App'>
            <Route
                path='/'
                render={(props) => <HomePage {...props}/>}
            />
        </div>
    );
}

export default App;

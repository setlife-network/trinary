import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import './styles/index.scss'
import App from './App'
import { API_ROOT } from './constants'

const cache = new InMemoryCache()
const uri = `${API_ROOT}/graph`
const client = new ApolloClient({
    uri,
    cache,
    connectToDevTools: true
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import './styles/index.scss'
import App from './App'
import { API_ROOT } from './constants'

const cache = new InMemoryCache()
const client = new ApolloClient({
    uri: `${API_ROOT}/graph`,
    connectToDevTools: true,
    cache
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

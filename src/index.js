import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { ToastProvider } from 'react-toast-notifications'

import './styles/index.scss'
import App from './App'
import { API_ROOT } from './constants'

const cache = new InMemoryCache()
const uri = `${API_ROOT}/graph`
const link = createHttpLink({
    uri,
    credentials: 'include'
})
const client = new ApolloClient({
    link,
    cache,
    connectToDevTools: true
})

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <ToastProvider placement='bottom-left' autoDismiss autoDismissTimeout={5000}>
                    <App />
                </ToastProvider>
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

export const LOGO_URL = 'https://project-trinary.s3.amazonaws.com/images/Logo.png'

export const API_ROOT = process.env.NODE_ENV == 'production'
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:6001/api'

export const CURRENCIES = [
    {
        name: 'USD'
    },
    {
        name: 'MXN'
    },
    {
        name: 'EUR'
    },
    {
        name: 'BTC'
    }
]

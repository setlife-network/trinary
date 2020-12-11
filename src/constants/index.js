export const LOGO_URL = 'https://project-trinary.s3.amazonaws.com/images/Logo.png'
export const SITE_ROOT = process.env.NODE_ENV == 'production'
    ? 'https://project-trinary.herokuapp.com/'
    : 'http://localhost:6002'
export const API_ROOT = `${SITE_ROOT}/api`

export const CURRENCIES = [
    {
        name: 'USD'
    },
    {
        name: 'MXUSD'
    },
    {
        name: 'EUR'
    }
]

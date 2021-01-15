export const API_ROOT = process.env.REACT_APP_API_URL
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
export const IS_PRODUCTION = process.env.NODE_ENV == 'production' ? true : false
export const LOGO_URL = 'https://project-trinary.s3.amazonaws.com/images/Logo.png'
export const NAV_ITEMS = [
    {
        text: 'Home',
        route: '/',
    },
    {
        text: 'LoginPage',
        route: '/login',
    },
    {
        text: 'Clients List Page',
        route: '/clients'
    },
    {
        text: 'ClientDetailPage',
        route: '/clients/1',
    },
    {
        text: 'AddClientPage',
        route: '/client/add',
    },
    {
        text: 'ProjectDetailPage',
        route: '/projects/1',
    },
    {
        text: 'AddProjectPage',
        route: '/project/add'
    }
]

export const API_ROOT = process.env.REACT_APP_API_URL
export const CURRENCIES = [
    {
        name: 'USD',
        symbol: '$',
        decimal: '.',
        thousand: ','
    },
    {
        name: 'MXN',
        symbol: '$',
        decimal: '.',
        thousand: ','
    },
    {
        name: 'EUR',
        symbol: '€',
        decimal: ',',
        thousand: '.'
    },
    {
        name: 'BTC',
        symbol: '₿',
        decimal: '.',
        thousand: ','
    },
    {
        name: '',
        symbol: '',
        decimal: '.',
        thousand: ','
    }
]
export const EXPECTED_BUDGET_TIMEFRAME_OPTIONS = [
    {
        option: 'daily'
    },
    {
        option: 'weekly'
    },
    {
        option: 'quarterly'
    },
    {
        option: 'monthly'
    },
    {
        option: 'yearly'
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

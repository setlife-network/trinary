export const API_ROOT = process.env.REACT_APP_API_URL
export const IS_PRODUCTION = process.env.NODE_ENV == 'production' ? true : false
export const GITHUB_LOGO_URL = 'https://project-trinary.s3.us-east-1.amazonaws.com/images/github-icon.png'
export const GITHUB_ALT_LOGO_URL = 'https://setlife-solutions.s3.us-east-1.amazonaws.com/images/github-alt-logo.png'
export const HERO_IMAGE_URL = 'https://project-trinary.s3.us-east-1.amazonaws.com/images/landing-banner.png'
export const IPHONE_IMAGE_URL = 'https://project-trinary.s3.us-east-1.amazonaws.com/images/iphone-landing-mockup.png'
export const BUDGETING_IMAGE_URL = 'https://project-trinary.s3.us-east-1.amazonaws.com/images/budget-landing-mockup.png'
export const WALLET_OF_SATOSHI_ICON_URL = 'https://project-trinary.s3.us-east-1.amazonaws.com/images/wallet-of-satoshi.png'
export const MUUN_ICON_URL = 'https://play-lh.googleusercontent.com/8fbesX3FwtlJXy_W72BOHGqbMM220XX3q6O7K3xE04XyLR9Pz9wwDdZOyjklYG1Lm8o'
export const ZEUS_ICON_URL = 'https://store.zeusln.app/wp-content/uploads/2022/03/Word-Logo-300x153.png'
export const CURRENCIES = [
    {
        name: 'USD',
        symbol: '$',
        decimal: '.',
        thousand: ',',
        precision: 2,
    },
    {
        name: 'MXN',
        symbol: '$',
        decimal: '.',
        thousand: ',',
        precision: 2,
    },
    {
        name: 'EUR',
        symbol: '€',
        decimal: ',',
        thousand: '.',
        precision: 2,
    },
    {
        name: 'BTC',
        symbol: '₿',
        decimal: '.',
        thousand: ',',
        precision: 2,
    },
    {
        name: 'SATS',
        symbol: 's ',
        decimal: '.',
        thousand: ',',
        precision: 0,
    },
    {
        name: '',
        symbol: '',
        decimal: '.',
        thousand: ',',
        precision: 2,
    }
]
export const FOOTER_LINKS = [
    {
        type: 'GitHub',
        logo: GITHUB_LOGO_URL,
        url: 'https://github.com/setlife-network'
    },
    {
        type: 'YouTube',
        logo: 'https://project-trinary.s3.us-east-1.amazonaws.com/images/youtube-icon.png',
        url: ''
    },
    {
        type: 'Twitter',
        logo: 'https://project-trinary.s3.us-east-1.amazonaws.com/images/twitter-icon.png',
        url: ''
    },
    {
        type: 'LinkedIn',
        logo: 'https://project-trinary.s3.us-east-1.amazonaws.com/images/linkedin-vector.png',
        url: 'https://www.linkedin.com/company/setlife-network/'
    }
]
export const WALLET_OPTIONS = [
    {
        icon: 'key',
        title: 'Simple',
        subtitle: 'Provide a BTC address',
        route: 'setup/simple',
        disabled: false
    },
    {
        icon: 'wallet',
        title: 'Advanced',
        subtitle: 'Download External Wallet',
        route: 'setup/advanced',
        disabled: false
    },
    {
        icon: 'network-wired',
        title: 'Federated',
        subtitle: 'Connect your Node',
        route: 'setup/federated',
        disabled: true
    }
]
export const FUNDING_PLAN_TIMEFRAME_AMOUNTS = ['Monthly amount', 'Total amount', 'Quarterly']
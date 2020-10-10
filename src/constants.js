export const SITE_ROOT = process.env.NODE_ENV == 'production'
    ? 'https://project-trinary.herokuapp.com'
    : 'http://localhost:6001'

export const API_ROOT = `${SITE_ROOT}/api`

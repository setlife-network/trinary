import {
    find,
    split
} from 'lodash'

import { CURRENCIES } from '../constants'

export const selectCurrencySymbol = (props) => {
    const {
        currency
    } = props
    return find(CURRENCIES, c => {
        return c.name == currency
    })['symbol']
}

export const selectCurrencyInformation = (props) => {
    return find(CURRENCIES, c => {
        return c.name == props.currency
    })
}

export const verifyGithubURL = (url) => {
    const githubLinkInformation = split(url, '/')
    if (githubLinkInformation.length != 5) {
        return 0
    }
    return 1
}

export const verifyTogglURL = (url) => {
    const togglLinkInformation = split(url, '/')
    if (togglLinkInformation.length != 7) {
        return 0
    }
    return 1
}

import { find } from 'lodash'

import { CURRENCIES } from '../constants'

export const capitalizeWord = (props) => {
    const {
        word
    } = props
    if (typeof word !== 'string') return ''
    return word.charAt(0).toUpperCase() + word.slice(1)
}

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

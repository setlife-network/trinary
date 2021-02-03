import { find } from 'lodash'

import { CURRENCIES } from '../constants'

export const selectCurrencySymbol = (props) => {
    return find(CURRENCIES, c => {
        return c.name == props.currency
    })['symbol']
}

export const capitalizeWord = (props) => {
    const {
        word
    } = props
    if (typeof word !== 'string') return ''
    return word.charAt(0).toUpperCase() + word.slice(1)
}

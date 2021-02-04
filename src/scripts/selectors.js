import { find } from 'lodash'

import { CURRENCIES, NAV_TITLES } from '../constants'

export const capitalizeWord = (props) => {
    const {
        word
    } = props
    if (typeof word !== 'string') return ''
    return word.replace(
        /\w\S*/g,
        (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    )
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

export const matchTitlePage = (props) => {
    const {
        location
    } = props
    const locationTitle = NAV_TITLES.find(tl => {
        return tl.locations.find(l => location.match(l))
    })
    return locationTitle
}

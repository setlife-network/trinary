import { find } from 'lodash'

import { CURRENCIES } from '../constants'

export const selectCurrencySymbol = (props) => {
    const {
        currency
    } = props
    return find(CURRENCIES, c => {
        return c.name == currency
    })['symbol']
}

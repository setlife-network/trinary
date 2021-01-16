import { find } from 'lodash'

import { CURRENCIES } from '../constants'

export const selectCurrencySymbol = (currency) => {
    return find(CURRENCIES, c => {
        return c.name == currency
    })['symbol']
}

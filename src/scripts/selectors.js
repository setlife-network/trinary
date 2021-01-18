import { find } from 'lodash'

import { CURRENCIES } from '../constants'

export const selectCurrencySymbol = (props) => {
    return find(CURRENCIES, c => {
        return c.name == props.currency
    })['symbol']
}

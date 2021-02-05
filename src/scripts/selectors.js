import { filter, find } from 'lodash'
import accounting from 'accounting-js'
import moment from 'moment'

import { CURRENCIES } from '../constants'

export const formatAmount = (props) => {
    const {
        amount,
        currencyInformation
    } = props
    return accounting.formatMoney(
        amount,
        {
            symbol: currencyInformation['symbol'],
            thousand: currencyInformation['thousand'],
            decimal: currencyInformation['decimal'],
            format: '%s %v'
        }
    )
}

export const selectActiveAndUpcomingAllocations = ({ allocation }) => {
    return moment(allocation['end_date'], 'x').isAfter(moment())
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

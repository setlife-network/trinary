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

export const getAllocationsContributors = ({ allocations }) => {
    const contributorsAllocated = []
    allocations.map(a => {
        if (!contributorsAllocated.includes(a.contributor)) {
            contributorsAllocated.push(a.contributor)
        }
    })
    return contributorsAllocated
}

export const selectActiveAndUpcomingAllocations = ({ activeOnly, allocation, upcomingOnly }) => {
    if (activeOnly) {
        return moment(allocation['start_date'], 'x').isBefore(moment()) && moment(allocation['end_date'], 'x').isAfter(moment())
    }
    if (upcomingOnly) {
        return moment(allocation['start_date'], 'x').isAfter(moment())
    }
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

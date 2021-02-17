import {
    filter,
    find,
    split
} from 'lodash'
import accounting from 'accounting-js'
import moment from 'moment'

import { CURRENCIES, NAV_TITLES } from '../constants'

export const capitalizeWord = (props) => {
    const {
        word
    } = props
    if (typeof word !== 'string') return ''
    return word.replace(
        /\w\S*/g,
        (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        }
    )
}
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
export const getAllocatedContributors = ({ allocations }) => {
    const contributorsAllocated = []
    allocations.map(a => {
        if (!contributorsAllocated.includes(a.contributor)) {
            contributorsAllocated.push(a.contributor)
        }
    })
    return contributorsAllocated
}
export const getActiveAndUpcomingAllocations = ({ activeOnly, allocations, upcomingOnly }) => {
    const desiredAllocations = []
    allocations.map(a => {
        if (activeOnly) {
            if (moment(a['start_date'], 'x').isBefore(moment()) && moment(a['end_date'], 'x').isAfter(moment())) {
                desiredAllocations.push(a)
            }
        } else if (upcomingOnly) {
            if (moment(a['start_date'], 'x').isAfter(moment())) {
                desiredAllocations.push(a)
            }
        } else if (moment(a['end_date'], 'x').isAfter(moment())) {
            desiredAllocations.push(a)
        }
    })
    return desiredAllocations
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

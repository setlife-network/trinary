import { CURRENCIES } from '../constants'

export const getHandle = (url) => {
    return url.split('/').pop()
}

export const selectCurrencyInformation = (props) => {
    return CURRENCIES.find(c => c.name == props.currency)
}
import { CURRENCIES } from '../constants'

export const selectCurrencyInformation = (props) => {
    return CURRENCIES.find(c => c.name == props.currency)
}
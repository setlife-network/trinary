import React, { useState } from 'react'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { Icon } from '@material-ui/core'

import { selectCurrencyInformation } from '../scripts/selectors'

const SendBonusEqualy = (props) => {

    const { project } = props

    const [selectedContributors, setSelectedContributors] = useState([])

    const currencyInformation = project.expected_budget_currency
        ? selectCurrencyInformation({
            currency: project.expected_budget_currency
        }) 
        : null

    const selectContributor = (idx) => {
        if (selectedContributors.includes(idx)) {
            setSelectedContributors(
                selectedContributors.filter(c => c != idx)
            )
            return
        }
        setSelectedContributors([...selectedContributors, idx])
    }

    const renderContributors = (contributors) => {
        return contributors.map((c, idx) => {
            const isSelected = selectedContributors.includes(idx)
            return (
                <div className='contributor grid grid-cols-8 mb-3'>
                    <button
                        type='button'
                        onClick={() => selectContributor(idx)}
                        className={`rounded-full border-solid border-2 border-setlife text-center h-6 w-6 text-sm col-span-1 my-auto ${isSelected ? 'bg-setlife' : 'bg-white'}`}
                    >
                        <Icon className='icon fa-solid fa-check text-white text-center w-full h-full m-auto align-middle' fontSize='inherit'/>
                    </button>
                    <div className='my-auto rounded-full h-10 w-10 bg-light text-4xl text-center col-span-1'>
                        <Icon className='icon fas fa-user text-gray text-center w-full h-full mt-2.5' fontSize='medium'/>
                    </div>
                    <div className='my-auto col-span-6 pl-4'>
                        <p className='truncate'>
                            {c.name}
                        </p>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className='SendBonusEqualy'>
            <div className='mt-10'>
                <CurrencyTextField
                    fullWidth
                    label='Payment amount'
                    variant='outlined'
                    currencySymbol={`${currencyInformation['symbol']}`}
                    minimumValue='0'
                    outputFormat='string'
                    decimalCharacter={`${currencyInformation['decimal']}`}
                    digitGroupSeparator={`${currencyInformation['thousand']}`}
                    onChange={(event, value) => setPaymentAmount(parseInt(value, 10))}
                />
            </div>
            <div className='mt-10'>
                <p className='font-bold text-md mb-4'>
                    Active contributors for this project
                </p>
                {renderContributors(project.contributors)}
            </div> 
        </div>
    )
}

export default SendBonusEqualy
import React, { useEffect, useState } from 'react'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { Icon } from '@material-ui/core'

import { selectCurrencyInformation } from '../scripts/selectors'

const SendBonusCustomize = (props) => {

    const {
        project,
        setBonusPayments,
    } = props

    const [selectedContributorsIdx, setSelectedContributorsIdx] = useState([])
    const [localBonusPayments, setLocalBonusPayments] = useState([])

    useEffect(() => {
        console.log('localBonusPayments')
        console.log(localBonusPayments)
        setBonusPayments(localBonusPayments)
    }, [localBonusPayments])

    useEffect(() => {
        const bonuses = localBonusPayments
        localBonusPayments.map((b, idx) => {
            if (selectedContributorsIdx.includes(b.idx)) {
                const activeBonus = b
                activeBonus.active = 1
                bonuses.splice(idx, 1)
                setLocalBonusPayments([...bonuses, activeBonus])
            } else {
                const inactiveBonus = b
                inactiveBonus.active = 0
                bonuses.splice(idx, 1)
                setLocalBonusPayments([...bonuses, inactiveBonus])
            }
        }) 
    }, [selectedContributorsIdx])

    const currencyInformation = project.expected_budget_currency
        ? selectCurrencyInformation({
            currency: project.expected_budget_currency
        }) 
        : null

    const selectContributor = (contributor, idx) => {
        if (selectedContributorsIdx.includes(idx)) {
            setSelectedContributorsIdx(
                selectedContributorsIdx.filter(c => c != idx)
            )
        } else {
            setSelectedContributorsIdx([...selectedContributorsIdx, idx])
        }
    }

    const handleBonusAmountChange = (contributor, amount, idx) => {
        if (amount.includes('.')) {
            amount = amount.slice(0, amount.indexOf('.'))
        }
        let bonusIdx = -1
        localBonusPayments.map((b, idx) => {
            if (b.contributor.id == contributor.id) {
                bonusIdx = idx
            }
        })
        const bonuses = localBonusPayments
        if (bonusIdx != -1) {
            bonuses.splice(bonusIdx, 1)
        }
        const newBonusAmount = {
            active: 1,
            amount: amount,
            idx: idx,
            contributor: contributor
        }
        setLocalBonusPayments([...bonuses, newBonusAmount])
    }

    const renderContributors = (contributors) => {
        return contributors.map((c, idx) => {
            const isSelected = selectedContributorsIdx.includes(idx)
            return (
                <div className='contributor mb-3 flex'>
                    <button
                        type='button'
                        onClick={() => selectContributor(c, idx)}
                        className={`mr-4 rounded-full border-solid border-2 border-setlife text-center h-6 w-6 text-sm col-span-1 my-auto ${isSelected ? 'bg-setlife' : 'bg-white'}`}
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
                    <div className='mt-5 ml-auto'>
                        <CurrencyTextField
                            fullWidth
                            label='Payment amount'
                            variant='outlined'
                            currencySymbol={`${currencyInformation['symbol']}`}
                            minimumValue='0'
                            outputFormat='string'
                            decimalCharacter={`${currencyInformation['decimal']}`}
                            digitGroupSeparator={`${currencyInformation['thousand']}`}
                            onChange={(event) => handleBonusAmountChange(c, event.target.value, idx)}
                            disabled={!isSelected}
                        />
                    </div>
                </div>
            )
        })
    }

    const allContributorsSelected = selectedContributorsIdx.length == project.contributors.length
    const indicesArray = Array.from({ length: project.contributors.length }, (value, index) => index);

    return (
        <div className='SendBonusCustomize'>
            <div className='mt-10'>
                <p className='font-bold text-md mb-4'>
                    Active contributors for this project
                </p>
                <button
                    type='button'
                    onClick={() => setSelectedContributorsIdx(allContributorsSelected ? [] : indicesArray)}
                    className={`rounded-full border-solid border-2 border-med-gray bg-med-gray text-center text-sm my px-4 py-1 mb-4`}
                >
                    {allContributorsSelected ? 'Select None' : 'Select All'}
                </button>
                <div className='overflow-scroll h-85'>
                    {renderContributors(project.contributors)}
                </div>
            </div> 
        </div>
    )
}

export default SendBonusCustomize
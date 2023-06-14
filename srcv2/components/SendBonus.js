import React, { useState, useEffect } from 'react'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { useMutation } from '@apollo/client'

import SendBonusAmount from './SendBonusAmount'
import SendBonusConfirmation from './SendBonusConfirmation'
import SendBonusSuccessful from './SendBonusSuccessful'

import { CONVERT_USD_TO_SATS_AMOUNT } from '../operations/mutations/PaymentMutations'

const SendBonus = (props) => {

    const {
        project,
        setOpen
    } = props

    const [selectedContributors, setSelectedContributors] = useState([])
    const [screenIndex, setScreenIndex] = useState(0)
    const [bonusAmount, setBonusAmount] = useState(0)
    const [satsBonusAmount, setSatsBonusAmount] = useState()
    const [bonusPayments, setBonusPayments] = useState([])
    const [satsBonusPayments, setSatsBonusPayments] = useState([])

    const screens = [SendBonusAmount]

    const buttonText = ['Continue', 'Send bonuses', 'Finish']

    useEffect(() => {
        console.log('UE bonusPayments')
        console.log(bonusPayments)
    }, [bonusPayments])

    useEffect(() => {
        const newBonusAmounts = []
        selectedContributors.map(contributor => {
            const newBonusAmount = {
                active: 1,
                amount: bonusAmount.replace(',', ''),
                contributor: contributor
            }
            newBonusAmounts.push(newBonusAmount)
        })
        setBonusPayments(newBonusAmounts)
    }, [bonusAmount, selectedContributors])

    const [fetchSatsAmount] = useMutation(CONVERT_USD_TO_SATS_AMOUNT)

    const nextStep = async () => {
        if (screenIndex == 0) {
            if (bonusAmount != 0) {
                const variables = { amount: parseInt(bonusAmount, 10) }
                const { data } = await fetchSatsAmount({ variables })
                setSatsBonusAmount(data.convertUSDtoSATS)
            }
            if (bonusPayments.length) {
                const variables = bonusPayments.map(async bp => {
                    const amount = parseInt(bp, 10)
                    const { data } = await fetchSatsAmount({ variables })
                })
                console.log(variables)
            }
        }
        setScreenIndex(screenIndex + 1)
    }

    const disableContinue = (!selectedContributors.length || !bonusAmount) && bonusPayments.length == 0

    if (screenIndex == 3) { setOpen(false) }

    return (
        <div className='SendBonus lg:px-16'>
            {screenIndex == 0 &&
                <SendBonusAmount
                    project={project}
                    selectedContributors={selectedContributors}
                    setSelectedContributors={setSelectedContributors}
                    bonusAmount={bonusAmount}
                    setBonusAmount={setBonusAmount}
                    bonusPayments={bonusPayments}
                    setBonusPayments={setBonusPayments}
                />
            }
            {screenIndex == 1 &&
                <SendBonusConfirmation
                    selectedContributors={selectedContributors}
                    bonusAmount={bonusAmount.replace(',', '')}
                    satsBonusAmount={satsBonusAmount}
                    bonusPayments={bonusPayments}
                />
            }
            {screenIndex == 2 && 
                <SendBonusSuccessful
                    bonusAmount={bonusAmount.replace(',', '')}
                    satsBonusAmount={satsBonusAmount}
                />
            }
            <div className='grid absolute bottom-10 left-16 right-16 gap-2'>
                <button
                    className={`${disableContinue ? 'bg-med-gray' : 'bg-setlife'} rounded-full py-2 w-full text-white`}
                    onClick={() => nextStep()}
                    type='button'
                    disabled={disableContinue}
                >
                    {`${buttonText[screenIndex]}`}
                </button>
            </div>
        </div>
    )
}

export default SendBonus
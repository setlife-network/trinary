import React, { useState, useEffect } from 'react'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { useMutation } from '@apollo/client'

import SendBonusAmount from './SendBonusAmount'
import SendBonusConfirmation from './SendBonusConfirmation'
import SendBonusSuccessful from './SendBonusSuccessful'

import { CONVERT_USD_TO_SATS_AMOUNT, SEND_BONUS } from '../operations/mutations/PaymentMutations'

const SendBonus = (props) => {

    const {
        project,
        setOpen,
        screenIndex,
        setScreenIndex
    } = props

    const [selectedContributors, setSelectedContributors] = useState([])
    const [bonusAmount, setBonusAmount] = useState(0)
    const [bonusPayments, setBonusPayments] = useState([])
    const [selectedBonusSplitType, setSelectedBonusSplitType] = useState(0)
    const [sentBonuses, setSentBonuses] = useState(0)
    const [selectedCurrency, setSelectedCurrency] = useState('s ')
    
    const buttonText = ['Continue', 'Send bonuses', 'Finish']

    const handleSubmitPayments = async (bonusPayments) => {
        const sentBonusInfo = { succeeded: [], failed: [] }
        const contributorsWithWallets = []
        await Promise.all(bonusPayments.map(bp => {
            try {
                if (!bp.contributor.wallet) {
                    throw new Error('User does not have a wallet setup')
                }
                if (bp.contributor.wallet.invoice_macaroon != null || bp.contributor.wallet.onchain_address != null) {
                    contributorsWithWallets.push({ contributor_id: bp.contributor.id, amount_to_pay: Math.round(selectedCurrency == 's ' ? bp.amount : bp.satsBonusAmount) })
                }
            } catch (error) {
                console.log('An error occurred: ' + error)
                sentBonusInfo.failed.push(bp)
            }
        }))
        const bonusSent = await sendBonus({
            variables: {
                contributors: contributorsWithWallets
            }
        })
        bonusSent.data.sendPayment.map(bs => {
            try {
                if (bs.error) {
                    throw new Error('Transaction error')
                } else {
                    const paymentSucceeded = bonusPayments.filter(item => item.contributor.id === bs.contributorId)
                    sentBonusInfo.succeeded.push(...paymentSucceeded)
                }
            } catch (error) {
                console.log('An error occurred: ' + error)
                const paymentFailed = bonusPayments.filter(item => item.contributor.id === bs.contributorId)
                sentBonusInfo.failed.push(...paymentFailed)
            }
        })
        setSentBonuses(sentBonusInfo)
    }

    useEffect(() => {
        const newBonusAmounts = []
        selectedContributors.map(contributor => {
            const newBonusAmount = {
                active: 1,
                amount: bonusAmount ? bonusAmount.replace(',', '') : 0,
                contributor: contributor
            }
            newBonusAmounts.push(newBonusAmount)
        })
        setBonusPayments(newBonusAmounts)
    }, [bonusAmount, selectedContributors])

    const [fetchSatsAmount] = useMutation(CONVERT_USD_TO_SATS_AMOUNT)
    const [sendBonus, {
        data: dataSendBonus,
        loading: loadingSendBonus,
        error: errorSendBonus
    }] = useMutation(SEND_BONUS)

    const nextStep = async () => {
        if (screenIndex == 0) {
            if (bonusPayments.length) {
                await Promise.all(await bonusPayments.map(async bp => {
                    const variables = { amount: parseInt(bp.amount, 10) }
                    const { data } = await fetchSatsAmount({ variables })
                    bp.satsBonusAmount = data.convertUSDtoSATS
                    return data.convertUSDtoSATS
                }))
                setBonusPayments(bonusPayments)
            }
        } else if (screenIndex == 1) {
            await handleSubmitPayments(bonusPayments)
        }
        setScreenIndex(screenIndex + 1)
    }

    const enableContinue = (
        selectedContributors.length && bonusAmount != 0 && selectedBonusSplitType == 0
    ) || (
        !bonusPayments.length == 0 && selectedBonusSplitType == 1
    )

    if (screenIndex == 3) { 
        setOpen(false)
        setScreenIndex(0)
    }

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
                    selectedBonusSplitType={selectedBonusSplitType}
                    setSelectedBonusSplitType={setSelectedBonusSplitType}
                    selectedCurrency={selectedCurrency}
                    setSelectedCurrency={setSelectedCurrency}
                />
            }
            {screenIndex == 1 &&
                <SendBonusConfirmation
                    bonusPayments={bonusPayments}
                    selectedBonusSplitType={selectedBonusSplitType}
                    selectedCurrency={selectedCurrency}
                />
            }
            {screenIndex == 2 && 
                <SendBonusSuccessful
                    sentBonuses={sentBonuses}
                    selectedCurrency={selectedCurrency}
                />
            }
            <div className='grid absolute bottom-10 left-16 right-16 gap-2'>
                <button
                    className={`${!enableContinue || loadingSendBonus ? 'bg-med-gray' : 'bg-setlife'} rounded-full py-2 w-full text-white`}
                    onClick={() => nextStep()}
                    type='button'
                    disabled={!enableContinue || loadingSendBonus}
                >
                    {`${buttonText[screenIndex]}`}
                </button>
            </div>
        </div>
    )
}

export default SendBonus
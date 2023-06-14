import React from 'react'
import {
    Icon
} from '@material-ui/core'

const SendBonusConfirmation = (props) => {

    const {
        bonusPayments,
        selectedBonusSplitType
    } = props

    const renderSenders = () => {
        return bonusPayments.map(bp => {
            return (
                <div className='sendingContributor grid grid-cols-2 mb-4'>
                    <div>
                        <p className='font-bold'>
                            {bp.contributor.name}
                        </p>
                    </div>
                    <div className='grid grid-cols-1 text-right'>
                        <p className='font-bold'>
                            {`${Intl.NumberFormat().format(Math.trunc(bp.satsBonusAmount))} SATS`}
                        </p>
                        <p className='text-gray'>
                            {`${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(Math.trunc(bp.amount))}`}
                        </p>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className='SendBonusConfirmation'>
            <p className='font-bold text-xl mb-4'>
                Confirmation page
            </p>
            <p className='font-bold text-xl mb-4 m-auto '>
                Please review the amount below and confirm before sending
            </p>
            <p className='text-5xl m-auto text-center my-4'>
                <Icon className='fa-solid fa-money-bill-trend-up text-setlife' fontSize='inherit'/>
            </p>
            {selectedBonusSplitType == 0 &&
                <>
                    <p className='text-center text-4xl'>
                        {`${Intl.NumberFormat().format(Math.trunc(bonusPayments[0].satsBonusAmount))} SATS`}
                    </p> 
                    <p className='text-center text-md text-gray'>
                        {`~ ${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(Math.trunc(bonusPayments[0].amount))}`}
                    </p>
                </>
            }
            <p className='font-bold text-md text-gray'>
                Sending to
            </p>
            <div className='rounded-lg bg-white-light mt-4 pt-4 pb-2 px-4'>
                {renderSenders()}
            </div>
        </div>
    )
}

export default SendBonusConfirmation
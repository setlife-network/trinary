import React from 'react'
import {
    Icon,
} from '@material-ui/core'

const SendBonusSuccessful = (props) => {

    const {
        bonusPayments
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
        <div className='SendBonusSuccessful'>
            <div>
                <div
                    type='button'
                    className='h-16 w-16 bg-setlife rounded-full text-3xl m-auto flex'
                    onClick={() => history.push(`/add-payment/${projectId}`)}
                > 
                    <Icon className='icon fa-solid fa-check text-white font-bold w-fit h-fit m-auto pb-1 leading-8 text-center' fontSize='inherit'/>
                </div>
                <p className='font-bold text-xl mb-4 m-auto text-center mt-8'>
                    Bonuses have been sent!
                </p>
                <p className='text-5xl m-auto text-center my-4 mt-8'>
                    <Icon className='fa-solid fa-money-bill-trend-up text-setlife' fontSize='inherit'/>
                </p>
                <div className='rounded-lg bg-white-light pt-4 pb-2 px-4 mt-6'>
                    {renderSenders()}
                </div>
            </div>
        </div>
    )
}

export default SendBonusSuccessful
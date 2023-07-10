import React from 'react'
import {
    Icon,
} from '@material-ui/core'

const SendBonusSuccessful = (props) => {

    const {
        sentBonuses,
        selectedCurrency
    } = props

    const renderSuccessfulTransactions = (payments) => {
        return payments.map(bp => {
            return (
                <div className='sendingContributor grid grid-cols-2 mb-4'>
                    <div>
                        <p className='font-bold'>
                            {bp.contributor.name}
                        </p>
                    </div>
                    <div className='grid grid-cols-1 text-right'>
                        <p className='font-bold'>
                            {selectedCurrency == 's '
                                ? `${Intl.NumberFormat().format(Math.trunc(bp.amount))} SATS`
                                : `${Intl.NumberFormat().format(Math.trunc(bp.satsBonusAmount))} SATS`
                            }
                        </p>
                        {selectedCurrency != 's ' &&
                            <p className='text-center text-md text-gray'>
                                {`${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(Math.trunc(bp.amount))}`}
                            </p>
                        }
                    </div>
                </div>
            )
        })
    }

    const renderFailedTransactions = (payments) => {
        return payments.map(bp => {
            return (
                <div className='sendingContributor grid grid-cols-2 mb-4'>
                    <div>
                        <p className='font-bold'>
                            {bp.contributor.name}
                        </p>
                    </div>
                    <div className='grid grid-cols-1 text-right'>
                        <p className='font-bold'>
                            {selectedCurrency == 's '
                                ? `${Intl.NumberFormat().format(Math.trunc(bp.amount))} SATS`
                                : `${Intl.NumberFormat().format(Math.trunc(bp.satsBonusAmount))} SATS`
                            }
                        </p>
                        <p className='text-gray'>
                            {selectedCurrency != 's ' &&
                                <p className='text-center text-md text-gray'>
                                    {`${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(Math.trunc(bp.amount))}`}
                                </p>
                            }
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
                {(sentBonuses.succeeded && sentBonuses.succeeded.length != 0) &&
                    <div className='rounded-lg bg-white-light pt-4 pb-2 px-4 mt-6'>
                        {renderSuccessfulTransactions(sentBonuses.succeeded)}
                    </div>
                }
                {(sentBonuses.failed && sentBonuses.failed.length != 0) &&
                    <>
                        <div className='flex mb-4 mt-8 text-xl'>
                            <Icon className='fa-solid fa-circle-exclamation text-red-500 my-auto mr-2' fontSize='inherit'/>
                            <p className='font-bold text-md text-red-500'>
                                Some transactions failed:
                            </p>
                        </div>
                        <div className='rounded-lg bg-red-100 pt-4 pb-2 px-4 mt-6'>
                            {renderFailedTransactions(sentBonuses.failed)}
                        </div>
                        
                    </>
                }
            </div>
        </div>
    )
}

export default SendBonusSuccessful
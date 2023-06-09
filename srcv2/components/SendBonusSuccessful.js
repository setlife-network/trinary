import React from 'react'
import {
    Icon,
} from '@material-ui/core'

const SendBonusSuccessful = (props) => {

    const {
        bonusAmount,
        satsBonusAmount,
    } = props

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
                <p className='text-center text-4xl mt-6'>
                    {`${Intl.NumberFormat().format(Math.trunc(satsBonusAmount))} SATS`}
                </p> 
                <p className='text-center text-md text-gray'>
                    {`~ ${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(Math.trunc(bonusAmount))}`}
                </p> 
            </div>
        </div>
    )
}

export default SendBonusSuccessful
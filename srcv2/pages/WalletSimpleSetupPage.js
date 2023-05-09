import React from 'react'
import {
    Icon
} from '@material-ui/core'

import Section from '../components/Section'

const WalletSimpleSetupPage = () => {
    return (
        <div className='WalletSimpleSetupPage h-full min-h-screen'>
            <Section backgroundColor={'bg-white-light'} className={'h-full min-h-screen'}>
                <p className='text-3xl font-bold'>
                    Simple Wallet Setup
                </p>
                <div className='grid grid-cols-6 gap-4 mt-4'>
                    <p className='col-span-5 text-xl font-bold mt-4'>
                        Enter your info below to set up your wallet
                    </p>
                    <div className='info'>
                        <Icon className='icon fas fa-info-circle text-black my-auto' fontSize='medium'/>
                    </div>
                </div>
            </Section>
        </div>

    )
}

export default WalletSimpleSetupPage

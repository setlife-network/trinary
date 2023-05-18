import React from 'react'

import Section from '../components/Section'
import WalletOption from '../components/WalletOption'
import { WALLET_OPTIONS } from '../constants'

const WalletSetupPage = () => {

    const renderWalletOptions = () => {
        return WALLET_OPTIONS.map((w, i) => {
            return (
                <WalletOption
                    icon={w.icon}
                    title={w.title}
                    subtitle={w.subtitle}
                    route={w.route}
                    count={i}
                    disabled={w.disabled}
                />
            )
        })
    }

    return (
        <div className='WalletSetupPage bg-med-gray h-full min-h-screen'>
            <Section>
                <p className='text-3xl font-bold mb-2'>
                    {'Choose one option'}
                </p>
                <p className='text-sm mb-7'>
                    {'Choose one of this three options and set up your wallet'}
                </p>
                {renderWalletOptions()}
            </Section>
        </div>
    )
}

export default WalletSetupPage
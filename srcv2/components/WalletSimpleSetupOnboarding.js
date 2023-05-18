import React, { useState } from 'react'
import {
    Icon
} from '@material-ui/core'

import Step from './Step'

import {
    MUUN_ICON_URL,
    WALLET_OF_SATOSHI_ICON_URL,
    ZEUS_ICON_URL
} from '../constants'

const WalletSimpleSetupOnboarding = ({
    setOnboardingScreenIndex,
    onboardingScreenIndex,
    setOpen
}) => {

    const goToNextScreen = () => {
        if (onboardingScreenIndex >= onboardingScreenRenders.length - 1) {
            setOpen(false)
            return 
        }
        setOnboardingScreenIndex(onboardingScreenIndex + 1)
    }

    const renderFirst = () => {
        const SETUP_STEPS = [
            {
                text: 'Download a wallet'
            },
            {
                text: 'Create a BTC address'
            },
            {
                text: 'Complete your security backup'
            },
            {
                text: 'Receive payments'
            }
        ]
        const renderSetupSteps = () => {
            return SETUP_STEPS.map((step, idx) => {
                return (
                    <Step number={idx + 1} title={step.text}/>
                )
            })
        }
        return (
            <div>
                <p className='text-2xl text-left font-bold'>Simple Option</p>
                <div className='mt-4'>
                    <p>
                        To receive payments in Trinary you need a BTC address to link the account
                    </p>
                </div>
                {renderSetupSteps()}
            </div>
        )
    }

    const renderSecond = () => {
        const renderWallets = () => {
            const WALLETS = [
                {
                    name: 'Wallet of Satoshi',
                    walletWeb: 'https://www.walletofsatoshi.com/',
                    icon: WALLET_OF_SATOSHI_ICON_URL
                },
                {
                    name: 'Muun',
                    walletWeb: 'https://muun.com/',
                    icon: MUUN_ICON_URL
                },
                {
                    name: 'Zeus',
                    walletWeb: 'https://zeusln.app/about',
                    icon: ZEUS_ICON_URL
                },
            ]
            return WALLETS.map(wallet => {
                return (
                    <a href={wallet.walletWeb} target='_blank' rel='noreferrer'>
                        <img
                            src={wallet.icon}
                            alt={wallet.name}
                            className='h-14 mx-auto mt-8'
                        />
                    </a>
                )
            })
        }
        return (
            <div>
                <div className='w-10 h-10 rounded-full bg-setlife text-white flex items-center justify-center mx-auto'>
                    <p className='font-bold text-lg'>1</p>
                </div>
                <p className='text-2xl text-left font-bold text-center mt-4'>Download a Wallet of Preference</p>
                <div>
                    <div>
                        {renderWallets()}
                    </div>
                </div>
            </div>
        )
    }

    const renderThird = () => {
        return (
            <div>
                <div className='w-10 h-10 rounded-full bg-setlife text-white flex items-center justify-center mx-auto'>
                    <p className='font-bold text-lg'>2</p>
                </div>
                <p className='text-2xl text-center font-bold mt-4'>Create Bitcoin Address</p>
                <div className='mt-4'>
                    <p>
                        Follow the step-by-step guide of your downloaded wallet and create a BTC address
                    </p>
                </div>
            </div>
        )
    }

    const renderFourth = () => {
        return (
            <div>
                <div className='w-10 h-10 rounded-full bg-setlife text-white flex items-center justify-center mx-auto'>
                    <p className='font-bold text-lg'>3</p>
                </div>
                <p className='text-2xl text-center font-bold mt-4'>Back Up your Wallet</p>
                <div className='mt-4 mb-8'>
                    <p>
                        Remember to create a backup to never lose access to your wallet
                    </p>
                </div>
                <div className='text-7xl mt-12 w-fit m-auto'>
                    <Icon className='fas fa-lock w-full text-center text-setlife' fontSize='inherit'/>
                </div>
                <div className='rounded-md bg-white-light h-12 mx-12 mt-6 flex justify-center'>
                    <p className='text-center m-auto text-xl font-bold'>
                        ************
                    </p>
                </div>
            </div>
        )
    }

    const renderFifth = () => {
        return (
            <div>
                <div className='w-10 h-10 rounded-full bg-setlife text-white flex items-center justify-center mx-auto'>
                    <p className='font-bold text-lg'>4</p>
                </div>
                <p className='text-2xl text-center font-bold mt-4'> Start Receiving Payments</p>
            </div>
        )
    }

    const renderOnboardingScreens = () => {
        return onboardingScreenRenders[onboardingScreenIndex]
    }

    const onboardingScreenRenders = [renderFirst(), renderSecond(), renderThird(), renderFourth(), renderFifth()]

    return (
        <div className='WalletSimpleSetupOnboarding'>
            {renderOnboardingScreens()}
            <div className='grid absolute bottom-10 left-8 right-8'>
                <button
                    type='button'
                    className={`rounded-full py-2 w-full text-white font-bold bg-setlife`}
                    onClick={() => goToNextScreen()}
                >
                    Continue
                </button>
            </div>
        </div>
    )
}

export default WalletSimpleSetupOnboarding
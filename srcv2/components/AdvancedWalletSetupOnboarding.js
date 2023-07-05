import React from 'react'

import Step from './Step'

const AdvancedWalletSetupOnboarding = ({
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
                text: 'Set up a Lightning node'
            },
            {
                text: 'Provide your node information'
            },
            {
                text: 'Receive payments directly to your node'
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
                <p className='text-2xl text-left font-bold'>Advanced Option</p>
                <div className='mt-4'>
                    <p>
                        To receive payments in Trinary, you will need to connect a Lightning node to use it as a wallet (only LND is supported currently).
                    </p>
                </div>
                {renderSetupSteps()}
            </div>
        )
    }

    const renderSecond = () => {
        return (
            <div>
                <div className='w-10 h-10 rounded-full bg-setlife text-white flex items-center justify-center mx-auto'>
                    <p className='font-bold text-lg'>1</p>
                </div>
                <p className='text-2xl text-left font-bold text-center mt-4'>Set up a Lightning node</p>
                <div>
                    <div className='mt-4'>
                        <p>
                            Set up a node using the platform of your preference.
                        </p>
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
                <p className='text-2xl text-center font-bold mt-4'>Provide your node information</p>
                <div className='mt-4'>
                    <p>
                        To validate and register your node we will need te following information:
                    </p>
                    <ul className='list-decimal mt-5 mx-8 font-bold'>
                        <li className='mb-5'>REST Host</li>
                        <li className='mb-5'>REST Port</li>
                        <li>Admin Macaroon</li>
                    </ul>
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
                <p className='text-2xl text-center font-bold mt-4'>Receive payments directly to your node</p>
            </div>
        )
    }

    const renderOnboardingScreens = () => {
        return onboardingScreenRenders[onboardingScreenIndex]
    }

    const onboardingScreenRenders = [renderFirst(), renderSecond(), renderThird(), renderFourth()]

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

export default AdvancedWalletSetupOnboarding
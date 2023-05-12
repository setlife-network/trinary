import React from 'react'
import {
    Icon
} from '@material-ui/core'

import Section from './Section'

const AdvancedWalletSetup = () => {
    return (
        <div className='AdvancedWalletSetup'>
            <Section className={'px-6'}>
                <div className='flex'>
                    <p className='font-bold text-lg'>
                        {'Enter your info bellow to set up your node'}
                    </p>
                    <Icon className={`icon fas fa-circle-question my-auto !w-8`}></Icon>
                </div>
            </Section>
        </div>
    )
}

export default AdvancedWalletSetup
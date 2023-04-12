import React from 'react'
import { useHistory } from 'react-router-dom';
import Section from './Section'
import {
    Icon
} from '@material-ui/core'

const WalletOption = ({
    icon,
    title,
    subtitle,
    route,
    count,
    disabled
}) => {

    const history = useHistory()

    return (
        <div className='WalletOption mb-5'>
            <button type='button' className='w-full text-start' onClick={() => history.push(route)}>
                <Section backgroundColor={'bg-white'} className={'rounded-lg border-light border-2 !py-3 px-6'}>
                    <div className='flex'>
                        <div className='mr-4 self-center'>
                            <Icon className={`icon fas fa-${icon} text-setlife my-auto !w-8`}/>
                        </div>
                        <div>
                            <p className='text-base font-semibold'>
                                {`${count + 1}. ${title}`}
                            </p>
                            <p className='text-sm'>
                                {subtitle}
                            </p>
                        </div>
                    </div>
                </Section>
            </button>
        </div>
    )
}

export default WalletOption
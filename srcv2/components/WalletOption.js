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

    const handleButton = () => {
        if (!disabled) {
            history.push(route)
        }
    }

    return (
        <div className='WalletOption mb-5'>
            <button disabled={disabled} type='button' className='w-full text-start' onClick={() => handleButton()}>
                <Section backgroundColor={'bg-white'} className={'rounded-lg border-light border-2 !py-3 px-6'}>
                    <div className='flex'>
                        <div className='mr-4 self-center'>
                            <Icon className={`icon fas fa-${icon} my-auto !w-8 ${disabled ? 'text-grey' : 'text-setlife'}`}/>
                        </div>
                        <div>
                            <p className={`text-base font-semibold ${disabled ? 'text-grey' : ''}`}>
                                {`${count + 1}. ${title}`}
                            </p>
                            <p className={`text-sm ${disabled ? 'text-grey' : ''}`}>
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
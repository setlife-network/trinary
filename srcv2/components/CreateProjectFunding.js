import React, { useState } from 'react'

import Selector from './Selector'
import Section from './Section'

import { CURRENCIES, FUNDING_PLAN_TIMEFRAME_AMOUNTS } from '../constants'

const CreateProjectFunding = (props) => {

    const {
        currency,
        setBudgetRange,
        timeframeAmount,
        setCurrency,
        setTimeFrameAmount
    } = props

    const [openCurrencyOpts, setOpenCurrencyOpts] = useState(false)
    const [openTimeFrameOpts, setOpenTimeFrameOpts] = useState(false)

    const renderCurrencies = () => {
        const optionClick = (currency) => {
            setOpenCurrencyOpts(false)
            setCurrency(currency)
        }
        return CURRENCIES.map(currency => {
            return (
                <button 
                    type='button'
                    onClick={() => optionClick(currency)}
                    className='text-gray-700 block px-4 py-2 text-sm text-ellipsis overflow-hidden'
                    role='menuitem'
                    tabIndex='-1'
                    id='menu-item-0'
                    key={currency.name}
                >
                    {currency.name}
                </button>    
            )
        })
    }

    const renderTimeFrameOpts = () => {
        const optionClick = (timeframe) => {
            setOpenTimeFrameOpts(false)
            setTimeFrameAmount(timeframe)
        }
        return FUNDING_PLAN_TIMEFRAME_AMOUNTS.map(timeframe => {
            return (
                <button 
                    type='button'
                    onClick={() => optionClick(timeframe)}
                    className='text-gray-700 block px-4 py-2 text-sm text-ellipsis overflow-hidden'
                    role='menuitem'
                    tabIndex='-1'
                    id='menu-item-0'
                    key={timeframe}
                >
                    {timeframe}
                </button>    
            )
        })
    }
    
    return (
        <div className='ProjectFunding'>
            <Section>
                <div className='grid grid-flow-col auto-cols-max gap-4'>
                    <div className='rounded-full bg-setlife w-fit px-2 mx-auto'>
                        <p className='p-2 text-lg'>
                            2
                        </p>
                    </div>
                    <p className='m-auto'>
                        Establish budget
                    </p>
                </div>
                <div className='grid grid-cols-1 gap-4 mt-4'>
                    <input 
                        type='text'
                        placeholder='Budget range'
                        onChange={(e) => setBudgetRange(parseInt(e.target.value, 10))}
                        className='
                        form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-black
                        font-normal
                        bg-white bg-clip-padding
                        border border-solid border-light
                        rounded-lg
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        '
                    />
                    <Selector
                        title={currency.name}
                        renderOptions={renderCurrencies}
                        openOptions={openCurrencyOpts}
                        setOpenOptions={setOpenCurrencyOpts}
                        loadingOptions={false}
                    />
                    <Selector
                        title={timeframeAmount}
                        renderOptions={renderTimeFrameOpts}
                        openOptions={openTimeFrameOpts}
                        setOpenOptions={setOpenTimeFrameOpts}
                        loadingOptions={false}
                    />
                </div>
            </Section>
        </div>
    )
}

export default CreateProjectFunding
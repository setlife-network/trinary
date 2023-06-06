import React, { useState } from 'react'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

import SendBonusAmount from './SendBonusAmount'

const SendBonus = (props) => {

    const { project } = props

    const [selectedContributors, setSelectedContributors] = useState([])
    const [screenIndex, setScreenIndex] = useState(0)
    const [bonusAmount, setBonusAmount] = useState()

    const screens = [SendBonusAmount]

    return (
        <div className='SendBonus lg:px-16'>
            {!screenIndex && (
                <SendBonusAmount
                    project={project}
                    selectedContributors={selectedContributors}
                    setSelectedContributors={setSelectedContributors}
                    bonusAmount={bonusAmount}
                    setBonusAmount={setBonusAmount}
                />
            )}
            <div className='grid absolute bottom-10 left-16 right-16 gap-2'>
                <button
                    className='bg-setlife rounded-full py-2 w-full text-white'
                    onClick={() => setScreenIndex(screenIndex + 1)}
                    type='button'
                >
                    Continue
                </button>
            </div>
        </div>
    )
}

export default SendBonus
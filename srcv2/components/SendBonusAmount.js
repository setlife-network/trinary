import React, { useState } from 'react'

import SendBonusEqualy from './SendBonusEqualy'
import SendBonusCustomize from './SendBonusCustomize'

const BONUS_SPLIT_TYPES = [
    {
        type: 'equaly',
        name: 'Split Equaly'
    },
    {
        type: 'customize',
        name: 'Customize'
    }
]

const SendBonusAmount = (props) => {

    const {
        project,
        selectedContributors,
        setSelectedContributors,
        bonusAmount,
        setBonusAmount,
        bonusPayments,
        setBonusPayments,
        selectedBonusSplitType,
        setSelectedBonusSplitType,
        selectedCurrency,
        setSelectedCurrency
    } = props

    return (
        <div className='SendBonusAmount'>
            <p className='font-bold text-xl mb-4'>
                Enter info below to send a bonus
            </p>
            <div className='rounded-full bg-white-light grid grid-cols-2'>
                <button
                    type='button'
                    className={`font-bold rounded-full mr-1 ml-2 my-2 py-1 px-2 ${selectedBonusSplitType == 0 ? 'bg-setlife text-white' : 'bg-med-gray'}`}
                    onClick={() => setSelectedBonusSplitType(0)}
                >
                    <p>
                        {BONUS_SPLIT_TYPES[0].name}
                    </p>
                </button>
                <button
                    type='button'
                    className={`bg-med-gray font-bold rounded-full mr-2 ml-1 my-2 py-1 px-2 ${selectedBonusSplitType == 1 ? 'bg-setlife text-white' : 'bg-med-gray'}`}
                    onClick={() => setSelectedBonusSplitType(1)}
                >
                    <p>
                        {BONUS_SPLIT_TYPES[1].name}
                    </p>
                </button>
            </div>
            {selectedBonusSplitType == 0 ? (
                <SendBonusEqualy
                    project={project}
                    selectedContributors={selectedContributors}
                    setSelectedContributors={setSelectedContributors}
                    bonusAmount={bonusAmount}
                    setBonusAmount={setBonusAmount}
                    selectedCurrency={selectedCurrency}
                    setSelectedCurrency={setSelectedCurrency}
                />
            ) : (
                <SendBonusCustomize
                    project={project}
                    setBonusAmount={setBonusAmount}
                    bonusPayments={bonusPayments}
                    setBonusPayments={setBonusPayments}
                />
            )}
        </div>
    )
}

export default SendBonusAmount
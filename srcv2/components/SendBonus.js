import React, { useState } from 'react'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

import SendBonusEqualy from './SendBonusEqualy'

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

const SendBonus = (props) => {

    const { project } = props

    const [selectedBonusSplitType, setSelectedBonusSplitType] = useState(0)

    return (
        <div className='SendBonus'>
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
            <SendBonusEqualy project={project}/>
        </div>
    )
}

export default SendBonus
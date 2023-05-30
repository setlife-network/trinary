import React from 'react'

const SendBonus = () => {
    return (
        <div className='SendBonus'>
            <p className='font-bold text-xl mb-4'>
                Enter info below to send a bonus
            </p>
            <div className='rounded-full bg-white-light grid grid-cols-2'>
                <button type='button' className='bg-med-gray font-bold rounded-full mr-1 ml-2 my-2 py-1 px-2'>
                    Split equaly
                </button>
                <button type='button' className='bg-med-gray font-bold rounded-full mr-2 ml-1 my-2 py-1 px-2'>
                    <p>
                        Customize
                    </p>
                </button>
            </div>
        </div>
    )
}

export default SendBonus
import React from 'react'

const Step = ({
    title,
    number
}) => {
    
    return (
        <div className='Step flex mt-10'>
            <div className='w-10 h-10 rounded-full bg-setlife text-white flex items-center justify-center'>
                <p className='font-bold text-lg'>{number}</p>
            </div>
            <p className='mt-2 ml-3 text-sm'>{title}</p>
        </div>
    )
}

export default Step
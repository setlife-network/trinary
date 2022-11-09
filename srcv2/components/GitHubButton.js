import React from 'react'

import { GITHUB_LOGO_URL } from '../constants'

const GitHubButton = (props) => {
    const {
        text
    } = props
    return (
        <button className='GitHubButton bg-black rounded-full w-full' type='submit'>
            <div className='grid grid-flow-col auto-cols-max px-8 py-2 justify-center gap-4'>
                <div className=''>
                    <img src={GITHUB_LOGO_URL} alt={'GitHub'} className='h-6'/>
                </div>
                <div className=''>
                    <p className='text-white'>
                        {text}
                    </p>
                </div> 
            </div>
        </button>
    )
}

export default GitHubButton
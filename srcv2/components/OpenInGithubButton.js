import React from 'react'

import { GITHUB_ALT_LOGO_URL } from '../constants'

const OpenInGithubButton = (props) => {
    const {
        url
    } = props

    return (
        <div className='OpenInGithubButton'>
            <a 
                className='open-github bg-transparent rounded-full w-full' 
                href={`${url}`}
                target='_blank'
                rel='noreferrer'
            >
                <div className='grid grid-flow-col auto-cols-max px-8 py-2 justify-center gap-4'>
                    <div className=''>
                        <img src={GITHUB_ALT_LOGO_URL} alt={'GitHub'} className='h-6'/>
                    </div>
                    <div className=''>
                        <p className=''>
                            Open in GitHub
                        </p>
                    </div> 
                </div>
            </a>
        </div>
    )
}

export default OpenInGithubButton
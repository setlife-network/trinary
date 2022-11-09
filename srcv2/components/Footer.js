import React from 'react'

import Section from './Section'

import { GITHUB_LOGO_URL } from '../constants'

const Footer = () => {
    const renderSocialMedia = () => {
        const socialMedia = [
            {
                type: 'GitHub',
                logo: GITHUB_LOGO_URL,
                url: 'https://github.com/setlife-network'
            },
            {
                type: 'YouTube',
                logo: 'https://project-trinary.s3.us-east-1.amazonaws.com/images/youtube-icon.png',
                url: ''
            },
            {
                type: 'Twitter',
                logo: 'https://project-trinary.s3.us-east-1.amazonaws.com/images/twitter-icon.png',
                url: ''
            },
            {
                type: 'LinkedIn',
                logo: 'https://project-trinary.s3.us-east-1.amazonaws.com/images/linkedin-vector.png',
                url: 'https://www.linkedin.com/company/setlife-network/'
            }
        ]
        return socialMedia.map(social => {
            return (
                <a className='social-media' key={social.type} href={social.url} target='_blank' rel='noreferrer'>
                    <img src={social.logo} alt={social.type} className='h-6'/>
                </a>
            )
        })
        
    }
    return (
        <div className='Footer absolute bottom-0 w-full'>
            <Section backgroundColor={'bg-black'}>
                <div className='grid grid-rows-2 grid-flow-col gap-8'>
                    <div>
                        <p className='text-white font-bold text-xl text-center'>
                            TRINARY.NETWORK
                        </p>
                    </div>
                    <div className='grid grid-flow-col auto-cols-max flex justify-between'>
                        {renderSocialMedia()}
                    </div>
                </div>
            </Section>
        </div>
    )
}

export default Footer
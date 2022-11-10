import React from 'react'

import GitHubButton from '../components/GitHubButton'
import Section from '../components/Section'

import { HERO_IMAGE_URL } from '../constants'

const LoginPage = () => {

    return (
        <div className='LoginPage'>
            <Section backgroundColor={'bg-light'} className={'rounded-b-[70px]'}>
                <div className='header grid grid-flow-row auto-rows-max gap-8'>
                    <div className='grid grid-cols-1 gap-8'>
                        <p className='text-4xl font-bold'>
                            Log in
                        </p>
                        <p className='text-xl'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                        </p>
                    </div>
                    <div className='grid grid-cols-1'>
                        <img src={HERO_IMAGE_URL} alt='landing' className=' lg:mt-8 mx-auto' />
                    </div>
                </div>
            </Section>
            <Section>
                <div className='grid grid-cols-1 gap-8'>
                    <p className='text-center'>
                        Not a member? 
                        <a href='https://github.com/' target='_blank' rel='noreferrer'>
                            <u> Sign up now in Github </u>
                        </a>
                    </p>
                    <div className='w-fit m-auto'>
                        <GitHubButton
                            text={'Log in with your Github Account'}
                        />
                    </div>
                </div>
            </Section>
        </div>
    )
}

export default LoginPage
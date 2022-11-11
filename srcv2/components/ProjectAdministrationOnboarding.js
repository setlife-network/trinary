import React from 'react'

import Section from './Section'
import {
    IPHONE_IMAGE_URL
} from '../constants'

const ProjectAdministrationOnboarding = () => {
    return (
        <div className='ProjectAdminstrationOnboarding'>
            <Section backgroundColor={'bg-setlife'} className={'rounded-br-[70px] pb-0 px-0'}>
                <div className='header grid grid-flow-row auto-rows-max'>
                    <div className='grid grid-cols-1 gap-2'>
                        <p className='text-3xl text-center font-bold'>
                            Project Administration
                        </p>
                        <p className='text-white text-xl text-center font-bold'>
                            Create projects from any Github repo
                        </p>
                        <p className='text-white text-xl text-center font-bold'>
                            View insights for a project
                        </p>
                    </div>
                    <div className='grid grid-cols-1'>
                        <img src={IPHONE_IMAGE_URL} alt='iphone mockup' className=' lg:mt-8 mx-auto' />
                    </div>
                </div>
            </Section>
        </div>
    )
}

export default ProjectAdministrationOnboarding
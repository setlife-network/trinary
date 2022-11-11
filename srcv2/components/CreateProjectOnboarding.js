import React from 'react'

import Section from './Section'

const CreateProjectOnboarding = () => {
    return (
        <div className='CreateProjectOnboarding'>
            <Section>
                <div className='grid grid-cols-1 gap-2'>
                    <p className='text-3xl text-center font-bold'>
                        Create a project
                    </p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                    </p>
                </div>
            </Section>
            <Section>
                <div className='grid grid-flow-col auto-cols-max gap-4'>
                    <div className='rounded-full bg-setlife w-fit px-2 mx-auto'>
                        <p className='p-2 text-lg'>
                            1
                        </p>
                    </div>
                    <p className='m-auto'>
                        Connect a GitHub project
                    </p>
                </div>
                <div className='grid grid-cols-1 gap-4 mt-4'>
                    <div className='border border-light rounded-lg px-4 py-1'>
                        <p className='text-light'>User/Organization</p>
                    </div>
                    <div className='border border-light rounded-lg px-4 py-1'>
                        <p className='text-light'>Repo</p>
                    </div>
                    <div className='border border-light rounded-lg px-4 py-1'>
                        <p className='text-light'>Project name</p>
                    </div>
                </div>
            </Section>
        </div>
    )
}

export default CreateProjectOnboarding
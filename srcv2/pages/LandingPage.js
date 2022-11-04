import React from 'react'
import Section from '../components/Section'

const LandingPage = () => {

    const renderFeatures = () => {
        const FEATURES = [
            {
                title: 'Project Administration',
                goals: ['Create projects from any Github repo', 'View insights for a project']
            },
            {
                title: 'Budgeting',
                goals: ['Allocate funds to your team', 'Negotiate compensation rates', 'Fund allocations with BTC']
            }
        ]
        return FEATURES.map((feature, idx) => {
            const goals = feature.goals.map(goal => {
                return (
                    <p>{goal}</p>
                )
            })
            return (
                <div className='feature justify-center grid grid-flow-row auto-rows-max gap-8'>
                    <div className='rounded-full bg-setlife w-fit px-2 mx-auto'>
                        {idx}
                    </div>
                    <p className='title text-3xl text-center font-bold'>
                        {feature.title}
                    </p>
                    {goals}
                </div>
            )
        })
    }

    return (
        <div className='LandingPage'>
            <Section backgroundColor={'bg-light'} className={'rounded-b-[70px]'}>
                <div className='grid grid-flow-row auto-rows-max'>
                    <div className='grid grid-cols-1 gap-8'>
                        <p className='text-5xl text-center font-bold'>
                            Trinary
                        </p>
                        <p className='text-grey text-2xl text-center font-bold'>
                            Build a “micro-economy” for your team to share knowledge, trade feedback, & hold each other accountable
                        </p>
                    </div>
                </div>
            </Section>
            <Section className='flex justify-center'>
                <button className='bg-black rounded-full' type='submit'>
                    <div className='grid grid-cols-8 px-8 py-2'>
                        <div></div>
                        <div className='col-span-8'>
                            <p className='text-white'>Continue with GitHub</p>
                        </div> 
                    </div>
                </button>
            </Section>
            <Section>
                <div className='features grid grid-flow-row auto-rows-max'>
                    { renderFeatures() }
                </div>
            </Section>
        </div>
    )
}

export default LandingPage
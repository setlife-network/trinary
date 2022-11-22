import React from 'react'

import AllocationsList from '../components/AllocationsList'
import CreateProjectFloatingButton from '../components/CreateProjectFloatingButton'
import ProjectsList from '../components/ProjectsList'
import Section from '../components/Section'

import { sessionUser } from '../reactivities/variables'

const DashboardPage = () => {
    return (
        <div className='DashboardPage bg-light'>
            <Section backgroundColor={'bg-white'} className={'rounded-b-[70px]'}>
                <div className='grid grid-flow-row auto-rows-max gap-8'>
                    <p className='text-3xl text-center font-bold'>
                        {`Welcome, ${sessionUser().name}`}
                    </p>
                    <div className='rounded bg-setlife grid grid-flow-row auto-rows-max gap-2 px-8 py-4'>
                        <p className='text-white'>My allocations</p>
                        <p className='text-5xl text-white font-bold'>{`${sessionUser().totalPaid} units`}</p>
                    </div>
                    <div className='mx-auto'>
                        <button type='button'>
                            See summary
                        </button>
                    </div>
                </div>
            </Section>
            <Section>
                <AllocationsList/>
                <ProjectsList/>
            </Section>
            <CreateProjectFloatingButton />
        </div>
    )
}

export default DashboardPage
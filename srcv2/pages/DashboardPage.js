import React from 'react'
import {
    Icon
} from '@material-ui/core'

import AllocationsList from '../components/AllocationsList'
import CreateProjectFloatingButton from '../components/CreateProjectFloatingButton'
import ProjectsList from '../components/ProjectsList'
import Section from '../components/Section'

import { sessionUser } from '../reactivities/variables'

const DashboardPage = () => {
    return (
        <div className='DashboardPage bg-white-light absolute bottom-0 top-0 right-0 left-0'>
            <Section backgroundColor={'bg-white'} className={'rounded-b-[70px]'}>
                <div className='grid grid-flow-row auto-rows-max gap-8'>
                    <p className='text-3xl text-center font-bold'>
                        {`Welcome, ${sessionUser().name}`}
                    </p>
                    <div className='rounded bg-setlife grid grid-flow-row auto-rows-max gap-2 px-8 py-4'>
                        {!!sessionUser().totalPaid &&
                            <>
                                <p className='text-white'>My allocations</p>
                                <p className='text-5xl text-white font-bold'>{`${sessionUser().totalPaid} units`}</p>
                            </>
                        }
                        {!sessionUser().totalPaid &&
                            <div className='flex gap-2 text-3xl'>
                                <Icon className='icon fas fa-wallet text-white my-auto' fontSize='inherit'/>
                                <div className='m-auto'>
                                    <p className='text-white font-bold'>Setup your wallet</p>
                                    <p className='text-xl text-white font-bold'>Coming soon</p>
                                </div>  
                            </div>
                        }
                    </div>
                    {!!sessionUser().totalPaid &&
                        <div className='mx-auto'>
                            <button type='button'>
                                See summary
                            </button>
                        </div>
                    }
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
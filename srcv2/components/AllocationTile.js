import React, { useState } from 'react'
import {
    Icon
} from '@material-ui/core'
import { useMutation } from '@apollo/client'

import { sessionUser } from '../reactivities/variables'

import { GET_CONTRIBUTOR_ALLOCATIONS } from '../operations/queries/ContributorQueries'
import { UPDATE_ALLOCATION } from '../operations/mutations/AllocationMutations'

const AllocationTile = (props) => {

    const {
        allocation
    } = props

    const [allocationOptionsOpen, setAllocationOptionsOpen] = useState(false)

    const [
        updateAllocation, {
            dataUpdatedAllocation,
            loadingUpdatedAllocation,
            errorUpdatedAllocation
        }] = useMutation(UPDATE_ALLOCATION, 
        {
            refetchQueries: [{
                query: GET_CONTRIBUTOR_ALLOCATIONS,
                variables: {
                    id: Number(sessionUser().id) 
                }
            }]
        })

    const acceptAllocation = async () => {
        await updateAllocation({
            variables: {
                id: allocation.id,
                status: 'accepted'
            }
        })
        setAllocationOptionsOpen(false)
    }

    const declineAllocation = async () => {
        await updateAllocation({
            variables: {
                id: allocation.id,
                status: 'rejected'
            }
        })
        setAllocationOptionsOpen(false)
    }

    const renderAllocationOptions = () => {
        return (
            <div className='allocation-options flex gap-2'>
                <button
                    onClick={() => acceptAllocation()}
                    type='button'
                    className='allocation-option rounded-full p-2 bg-light flex w-fit px-2 gap-2'
                >
                    <div className='rounded-full bg-green-500 w-6 h-6'>
                        <Icon className='icon fas fa-check text-white'/>
                    </div>
                    <p>
                        Accept
                    </p>
                </button>
                <button
                    onClick={() => declineAllocation()}
                    type='button'
                    className='allocation-option rounded-full p-2 bg-light flex w-fit px-2 gap-2'
                >
                    <div className='rounded-full bg-red-500 w-6 h-6 text-center'>
                        <Icon className='icon fas fa-times text-white'/>
                    </div>
                    <p>
                        Decline
                    </p>
                </button>
            </div>        
        )
    }

    return (
        <div className='AllocationTile rounded-lg bg-white px-4 py-4'>
            <div className='grid grid-cols-6'>
                <div className='col-span-4 gap-4'>
                    <div className='flex gap-4 mb-2'>
                        <p className='text-2xl font-bold'>
                            {allocation.project.name}
                        </p>
                        {allocation.status == 'pending' &&
                            <button type='button' onClick={() => setAllocationOptionsOpen(!allocationOptionsOpen)}>
                                <Icon className='fas fa-chevron-down my-auto text-grey'/>
                            </button>
                        }
                    </div>
                    {allocationOptionsOpen &&
                            renderAllocationOptions()
                    }
                    <div className='mt-2'>
                        <p>
                            {`@${allocation.proposedBy.name}`}
                        </p>
                    </div>
                </div>
                <div className='col-span-2 flex gap-4 justify-end my-auto'>
                    <Icon className='fas fa-wallet text-setlife'/>
                    <p className='text-xl font-bold'>
                        {`$ ${allocation.amount}`}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AllocationTile
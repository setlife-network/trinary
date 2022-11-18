import React from 'react'
import {
    Icon
} from '@material-ui/core'
import { useQuery } from '@apollo/client'

import AllocationTile from './AllocationTile'

import { sessionUser } from '../reactivities/variables'

import { GET_CONTRIBUTOR_ALLOCATIONS } from '../operations/queries/ContributorQueries'

const AllocationsList = () => {

    const {
        data: dataContributorAllocations,
        loading: loadingContributorAllocations,
        error: errorContributorAllocations
    } = useQuery(GET_CONTRIBUTOR_ALLOCATIONS, {
        variables: {
            id: Number(sessionUser().id)
        }
    })

    const renderAllocations = () => {
        return dataContributorAllocations.getContributorById.allocations.map(allocation => {
            return (
                <AllocationTile
                    allocation={allocation}
                />
            )
        })
    }

    console.log('dataContributorAllocations')
    console.log(dataContributorAllocations)

    return (
        <div className='AllocationsList'>
            <div className='grid grid-flow-row auto-rows-max'>
                <div className='gap-2 flex mb-4'>
                    <Icon className='icon fas fa-money-bill-wave-alt'/>
                    <p>
                        Recent allocations
                    </p> 
                </div>
                {loadingContributorAllocations &&
                    `Loading...`
                }
                {dataContributorAllocations &&
                    renderAllocations()
                }
            </div>
        </div>
    )
}

export default AllocationsList
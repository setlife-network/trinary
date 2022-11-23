import React from 'react'
import {
    Icon
} from '@material-ui/core'
import { useQuery } from '@apollo/client'

import AllocationTile from './AllocationTile'

import { sessionUser } from '../reactivities/variables'

import { GET_CONTRIBUTOR_ALLOCATIONS } from '../operations/queries/ContributorQueries'

const AllocationsList = () => {

    const allocationPrototypeLink = 'https://www.figma.com/proto/qgGWXmprU7vTv7guzWzvML/Project-Trinary?node-id=4830%3A20523&scaling=scale-down&page-id=4076%3A12706&starting-point-node-id=4830%3A20523&show-proto-sidebar=1'

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

    return (
        
        <div className='AllocationsList'>
            <div className='grid grid-flow-row auto-rows-max gap-4'>
                <div className='gap-2 flex mb-4 mt-4'>
                    <Icon className='icon fas fa-money-bill-wave-alt'/>
                    <p>
                        Recent allocations
                    </p> 
                </div>
                {loadingContributorAllocations &&
                    `Loading...`
                }
                {/* {(dataContributorAllocations && !dataContributorAllocations.getContributorById.allocations.length) && 
                    <div className='text-center'>
                        <div className='text-5xl mb-4'>
                            <Icon className='fas fa-hammer' fontSize='inherit'/>
                        </div>
                        <div>
                            <p className='text-xl'>
                                You haven't received any allocations yet
                            </p> 
                        </div>  
                    </div>
                } */}
                <div className='text-center'>
                    <p className='text-base text-setlife' onClick={() => window.open(allocationPrototypeLink, '_blank')}>
                        Learn More
                    </p> 
                </div>
                {dataContributorAllocations &&
                    renderAllocations()
                }
            </div>
        </div>
    )
}

export default AllocationsList
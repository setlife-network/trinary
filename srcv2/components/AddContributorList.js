import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Icon } from '@material-ui/core'
import moment from 'moment'

import { GET_CONTRIBUTORS } from '../operations/queries/ContributorQueries'
import { CREATE_ALLOCATION } from '../operations/mutations/ContributorMutations'

const AddContributorList = ({
    projectId,
}) => {

    const {
        data: dataContributors,
        loading: loadingContributors,
        error: errorContributors,
    } = useQuery(GET_CONTRIBUTORS)

    const [createAllocation, {
        dataNewAllocation,
        loadingNewAllocation,
        errorNewAllocation
    }] = useMutation(CREATE_ALLOCATION)

    const handleAddContributor = async (contributorId) => {
        const newAllocation = await createAllocation({ 
            amount: 0,
            active: true,
            start_date: moment(),
            contributor_id: contributorId,
            rate_id: 0,
            project_id: projectId
        })
        console.log('newAllocation')
        console.log(newAllocation)
    }

    const renderContributors = (contributors) => {
        return contributors.map(c => {
            return (
                <div className='grid grid-cols-2 mb-4'>
                    <div>
                        <span className='align-middle'>
                            {c.name}
                        </span>
                    </div>
                    <div className='w-full'>
                        <div className='ml-auto w-fit'>
                            <button
                                type='button'
                                className='rounded-full bg-setlife h-8 w-8 drop-shadow-md'
                                onClick={() => handleAddContributor(c.id)}
                            >
                                <Icon className='icon fa-solid fa-plus text-white align-middle' fontSize='medium'/>
                            </button>
                        </div>
                    </div>

                </div>
            )
        })
    }

    if (loadingContributors) return 'Loading...'

    console.log('dataContributors')
    console.log(dataContributors)

    return (
        <div className='AddContributorList'>
            <p className='font-bold text-xl mb-4'>
                Add Contributor
            </p>
            <div className='overflow-scroll'>
                {renderContributors(dataContributors.getContributors)}
            </div>
        </div>
    )
}

export default AddContributorList
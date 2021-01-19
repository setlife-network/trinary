import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Button,
    ButtonGroup,
    Dialog,
    DialogTitle,
    FormControl,
    Grid
} from '@material-ui/core/'
import { fill } from 'lodash'

import RateMaxBudgetForm from './RateMaxBudgetForm'
import RateProratedMonthlyForm from './RateProratedMonthlyForm'
import { GET_PROJECT_CONTRIBUTOR_ALLOCATIONS } from '../operations/queries/ProjectQueries'

const AllocationAddForm = (props) => {

    const {
        contributor,
        project,
        onClose,
        open
    } = props

    const [allocationTypes, setAllocationTypes] = useState([1, 0])

    // useEffect(() => {
    // }, [dataContributorAllocation])

    console.log('contributor');
    console.log(contributor);

    const {
        data: dataContributorAllocation,
        loading: loadingProjectContributors,
        error: errorContributorAllocation
    } = useQuery(GET_PROJECT_CONTRIBUTOR_ALLOCATIONS, {
        variables: {
            id: Number(project.id),
            contributorId: contributor ? Number(contributor.id) : null
        }
    })

    const changeAllocationType = (props) => {
        const { allocationTypes, selectedType } = props
        const allocationTypesState = allocationTypes
        fill(allocationTypesState, 0)
        allocationTypesState[selectedType] = 1
        setAllocationTypes([...allocationTypesState])
    }

    if (loadingProjectContributors) return 'Loading...'
    if (errorContributorAllocation) return `Error :${errorContributorAllocation}`

    console.log('dataContributorAllocation');
    console.log(dataContributorAllocation);

    return (
        <Dialog
            onClose={onClose}
            open={open}
            className='AllocationAddForm'
        >
            <Box m={5}>
                <DialogTitle>
                    {`Add Allocation`}
                </DialogTitle>
                <ButtonGroup color='primary' aria-label='outlined primary button group'>
                    <Button
                        variant={`${allocationTypes[0] ? 'contained' : 'outlined'}`}
                        color='primary'
                        onClick={() => (changeAllocationType({ selectedType: 0, allocationTypes: allocationTypes }))}
                    >
                        {'Prorated monthly'}
                    </Button>
                    <Button
                        variant={`${allocationTypes[1] ? 'contained' : 'outlined'}`}
                        color='primary'
                        onClick={() => (changeAllocationType({ selectedType: 1, allocationTypes: allocationTypes }))}
                    >
                        {'Max Budget'}
                    </Button>
                </ButtonGroup>
                {
                    allocationTypes[0]
                        ? (
                            <RateProratedMonthlyForm/>
                        ) : (
                            <RateMaxBudgetForm/>
                        )
                }
            </Box>
        </Dialog>
    )
}

export default AllocationAddForm

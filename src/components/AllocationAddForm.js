import React, { useEffect, useState } from 'react'
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

const AllocationAddForm = (props) => {

    const {
        project,
        onClose,
        open
    } = props

    const [allocationTypes, setAllocationTypes] = useState([1, 0])

    const changeAllocationType = (props) => {
        const { allocationTypes, selectedType } = props
        const allocationTypesState = allocationTypes
        fill(allocationTypesState, 0)
        allocationTypesState[selectedType] = 1
        setAllocationTypes([...allocationTypesState])
    }

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

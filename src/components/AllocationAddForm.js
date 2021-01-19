import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery, useMutation } from '@apollo/client'
import {
    Box,
    Button,
    ButtonGroup,
    Dialog,
    DialogTitle,
    FormControl,
    Grid
} from '@material-ui/core/'
import { fill, findKey } from 'lodash'
import moment from 'moment'
import DatePicker from 'react-datepicker'

import RateMaxBudgetForm from './RateMaxBudgetForm'
import RateProratedMonthlyForm from './RateProratedMonthlyForm'
import { GET_CONTRIBUTOR_ALLOCATIONS } from '../operations/queries/ContributorQueries'
import { CREATE_RATE } from '../operations/mutations/RateMutations'

const AllocationAddForm = (props) => {

    const {
        contributor,
        project,
        onClose,
        open
    } = props

    const [newRate, { dataNewRate, loadingNewRate, errorNewRate }] = useMutation(CREATE_RATE)

    const [allocationTypes, setAllocationTypes] = useState([1, 0])
    const [mostRecentAllocation, setMostRecentAllocation] = useState(null)
    const [startDate, setStartDate] = useState(moment().add(1, 'months').startOf('month')['_d'])
    const [endDate, setEndDate] = useState(moment().add(1, 'months').endOf('month')['_d'])
    const [newAllocation, setNewAllocation] = useState({})

    const {
        data: dataContributorAllocations,
        loading: loadingContributorAllocations,
        error: errorContributorAllocations
    } = useQuery(GET_CONTRIBUTOR_ALLOCATIONS, {
        variables: {
            id: contributor ? Number(contributor.id) : null
        }
    })

    const changeAllocationType = (props) => {
        const { allocationTypes, selectedType } = props
        const allocationTypesState = allocationTypes
        fill(allocationTypesState, 0)
        allocationTypesState[selectedType] = 1
        setAllocationTypes([...allocationTypesState])
    }

    const getMostRecentAlloaction = (props) => {
        const { allocations } = props
        const mostRecentAllocation = [{ start_date: 0 }]
        allocations.map(a => {
            if (a.start_date > mostRecentAllocation[0].start_date) {
                return mostRecentAllocation[0] = a
            }
        })
        return mostRecentAllocation[0]
    }

    useEffect(() => {
        setMostRecentAllocation(null)
    }, [open])

    useEffect(() => {
        if (mostRecentAllocation) {
            if (mostRecentAllocation.rate.type == 'prorated_monthly') {
                setAllocationTypes([1, 0])
            } else if (mostRecentAllocation.rate.type == 'max_budget') {
                setAllocationTypes([0, 1])
            }
        }
    }, [mostRecentAllocation])

    const getRangedTimeEntries = (dates) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
    }

    const createRate = async (rate) => {
        //check if the values are different to any rate and if ti's the case, create new rate
        findKey()

        await newRate({
            variables: {
                hourly_rate: rate.hourly_rate.toString(),
                monthly_hours: Number(rate.monthly_hours),
                type: rate.type,
                contributor_id: contributor.id
            }
        })
        onClose()
    }

    if (loadingContributorAllocations) return ''
    if (errorContributorAllocations) return `error ${errorContributorAllocations}`

    const { allocations } = dataContributorAllocations.getContributorById
    if (allocations[0] && !mostRecentAllocation) {
        setMostRecentAllocation(getMostRecentAlloaction({ allocations }))
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
                <Grid container spacing={5}>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
                        <DatePicker
                            selected={startDate}
                            startDate={startDate}
                            endDate={endDate}
                            shouldCloseOnSelect={startDate && !endDate}
                            selectsRange
                            onChange={(date) => getRangedTimeEntries(date)}
                            customInput={
                                <Box
                                    px={2}
                                    py={1}
                                    boxShadow={3}
                                    borderRadius='borderRadius'
                                    bgcolor='primary.light'
                                >
                                    {`${
                                        startDate
                                            ? moment(startDate).format('MM/DD/YYYY')
                                            : 'Start date'
                                    } - ${
                                        endDate
                                            ? moment(endDate).format('MM/DD/YYYY')
                                            : ' End date'
                                    }`}
                                </Box>
                            }
                        />
                    </Grid>
                </Grid>
                {
                    allocationTypes[0]
                        ? (
                            <RateProratedMonthlyForm
                                currentRate={mostRecentAllocation ? mostRecentAllocation.rate : null}
                                setNewAllocation={setNewAllocation}
                            />
                        ) : (
                            <RateMaxBudgetForm
                                currentRate={mostRecentAllocation ? mostRecentAllocation.rate : null}
                                setNewAllocation={setNewAllocation}
                                startDate={moment(startDate)}
                                endDate={moment(endDate)}
                            />
                        )
                }
                <Button
                    variant={`contained`}
                    color='primary'
                    disabled={
                        !newAllocation['total_amount'] || !newAllocation['hourly_rate']
                            ? true
                            : false
                    }
                    onClick={() => createRate(newAllocation)}
                >
                    {'Add Allocation'}
                </Button>
            </Box>
        </Dialog>
    )

}

export default AllocationAddForm

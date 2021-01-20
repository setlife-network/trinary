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
import { differenceBy, fill, filter, findKey } from 'lodash'
import moment from 'moment'
import DatePicker from 'react-datepicker'

import RateMaxBudgetForm from './RateMaxBudgetForm'
import RateProratedMonthlyForm from './RateProratedMonthlyForm'
import AllocationAddSpecifics from './AllocationAddSpecifics'
import { GET_CONTRIBUTORS, GET_CONTRIBUTOR_ALLOCATIONS, GET_CONTRIBUTOR_RATES } from '../operations/queries/ContributorQueries'
import { GET_PROJECT_CONTRIBUTORS } from '../operations/queries/ProjectQueries'
import { CREATE_RATE } from '../operations/mutations/RateMutations'
import { CREATE_ALLOCATION } from '../operations/mutations/AllocationMutations'

const AllocationPaymentsAddForm = (props) => {

    const {
        contributor,
        payment,
        project,
        onClose,
        open
    } = props

    const {
        data: dataContributors,
        loading: loadingContributors,
        error: errorContributors
    } = useQuery(GET_CONTRIBUTORS)

    const [getContributorAllocations, {
        data: dataContributorAllocations,
        loading: loadingContributorAllocations,
        error: errorContributorAllocations
    }] = useLazyQuery(GET_CONTRIBUTOR_ALLOCATIONS)

    const [getContributorRates, {
        data: dataContributorRates,
        loading: loadingContributorRates,
        error: errorContributorRates
    }] = useLazyQuery(GET_CONTRIBUTOR_RATES)

    const {
        data: dataProjectContributors,
        loading: loadingProjectContributors,
        error: errorProjectContributors
    } = useQuery(GET_PROJECT_CONTRIBUTORS, {
        variables: {
            id: project.id
        }
    })

    const [createRate, { dataNewRate, loadingNewRate, errorNewRate }] = useMutation(CREATE_RATE)
    const [createAllocation, { dataNewAllocations, loadingNewAllocation, errorNewAllocation }] = useMutation(CREATE_ALLOCATION)

    const [allocationTypes, setAllocationTypes] = useState([1, 0])
    const [contributorAllocations, setContributorAllocations] = useState(null)
    const [mostRecentAllocation, setMostRecentAllocation] = useState(null)
    const [startDate, setStartDate] = useState(moment().add(1, 'months').startOf('month')['_d'])
    const [endDate, setEndDate] = useState(moment().add(1, 'months').endOf('month')['_d'])
    const [newAllocationRate, setNewAllocationRate] = useState({})
    const [newAllocation, setNewAllocation] = useState({})
    const [selectedContributor, setSelectedContributor] = useState({})

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

    useEffect(async() => {
        console.log('selectedContributor');
        console.log(selectedContributor.id);
        setContributorAllocations(await getContributorAllocations({
            variables: {
                id: selectedContributor.id
            }
        }))
    }, [selectedContributor])

    useEffect(() => {
        console.log('contributorAllocations');
        console.log(contributorAllocations);

    }, [contributorAllocations])

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

    const getRangedTimeEntries = (dates) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
    }

    const createRateAndAllocation = async (props) => {
        const {
            allocation,
            contributorRates,
            rate
        } = props

        const allocationRate = {}
        //check if the values are different to any rate and if ti's the case, create new rate
        const existingRate = findKey(
            contributorRates,
            {
                'hourly_rate': rate.hourly_rate.toString(),
                'monthly_hours': Number(rate.monthly_hours),
                'type': rate.type
            }
        )

        if (existingRate != null) {
            //create only allocation referencing contributorRates[existingRate].id
            allocationRate['id'] = contributorRates[`${existingRate}`].id
        } else {
            allocationRate['id'] = (await createRate({
                variables: {
                    hourly_rate: rate.hourly_rate.toString(),
                    monthly_hours: Number(rate.monthly_hours),
                    type: rate.type,
                    contributor_id: contributor.id
                }
            })).data.createRate.id
        }
        //create allocation with that rate id
        await createAllocation({
            variables: {
                amount: rate.total_amount,
                start_date: moment(startDate).format('YYYY-MM-DD'),
                end_date: moment(endDate).format('YYYY-MM-DD'),
                date_paid: null,
                payment_id: allocation.payment_id,
                project_id: project.id,
                contributor_id: allocation.contributor_id,
                rate_id: allocationRate.id
            }
        })

        onClose()
    }

    if (loadingProjectContributors || loadingContributors) return ''
    if (errorProjectContributors || errorContributors) return `error`

    const { allocations } = dataProjectContributors.getProjectById
    const { getContributors: contributors } = dataContributors
    const activeAllocations = filter(allocations, 'active')
    const activeContributors = activeAllocations.map(a => {
        return a.contributor
    })
    const contributorsToAdd = differenceBy(contributors, activeContributors, 'id')
    const rates = dataContributorRates ? dataContributorRates.getContributorById.rates : null

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
                <Grid container spacing={5} justify='center'>
                    <Grid item xs={12}>
                        <AllocationAddSpecifics
                            contributors={contributorsToAdd}
                            payment={payment}
                            project={project}
                            setNewAllocation={setNewAllocation}
                            setContributor={setSelectedContributor}
                        />
                        <hr/>
                    </Grid>

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
                                setNewAllocationRate={setNewAllocationRate}
                                startDate={moment(startDate)}
                                endDate={moment(endDate)}
                            />
                        ) : (
                            <RateMaxBudgetForm
                                currentRate={mostRecentAllocation ? mostRecentAllocation.rate : null}
                                setNewAllocationRate={setNewAllocationRate}
                                startDate={moment(startDate)}
                                endDate={moment(endDate)}
                            />
                        )
                }
                <Button
                    variant={`contained`}
                    color='primary'
                    disabled={
                        !newAllocationRate['total_amount'] || !newAllocationRate['hourly_rate']
                            ? true
                            : false
                    }
                    onClick={() => createRateAndAllocation({
                        allocation: newAllocation,
                        rate: newAllocationRate,
                        contributorRates: rates
                    })}
                >
                    {'Add Allocation'}
                </Button>
            </Box>
        </Dialog>
    )

}

export default AllocationPaymentsAddForm

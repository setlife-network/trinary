import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import {
    Box,
    Button,
    Collapse,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@material-ui/core/'
import {
    ExpandLess,
    ExpandMore
} from '@material-ui/icons'
import AssessmentIcon from '@material-ui/icons/Assessment'
import PaymentIcon from '@material-ui/icons/Payment'
import PeopleIcon from '@material-ui/icons/Group'
import moment from 'moment'
import {
    differenceBy,
    last,
    split
} from 'lodash'
import accounting from 'accounting-js'

import LoadingProgress from './LoadingProgress'
import { GET_ALL_PROJECTS, GET_PROJECT_CLIENT_PAYMENTS } from '../operations/queries/ProjectQueries'
import {
    formatAmount,
    selectCurrencyInformation,
    selectCurrencySymbol
} from '../scripts/selectors'

const AllocationProposeSpecifics = (props) => {

    const {
        contributor,
        setNewAllocation,
        setPayment,
        setProject
    } = props

    const {
        data: dataProjects,
        error: errorProjects,
        loading: loadingProjects
    } = useQuery(GET_ALL_PROJECTS)

    const [getClientPayments, {
        data: dataClientPayments,
        error: errorClientPayments,
        loading: loadingClientPayments
    }] = useLazyQuery(GET_PROJECT_CLIENT_PAYMENTS, {
        onCompleted: dataClientPayments => {
            setClientPayments([...dataClientPayments.getProjectById.client.payments, { amount: null, date_paid: null }])
        }
    })

    const [clientPayments, setClientPayments] = useState([{ amount: null, date_paid: null }])
    const [clientCurrency, setClienCurrency] = useState(null)
    const [openPaymentsList, setOpenPaymentsList] = useState(false)
    const [openProjectsList, setOpenProjectsList] = useState(false)
    const [selectedPayment, setSelectedPayment] = useState(null)
    const [selectedProject, setSelectedProject] = useState(null)

    useEffect(() => {
        if (selectedProject) {
            setProject(selectedProject)
            setClienCurrency(
                selectCurrencyInformation({
                    currency: selectedProject.client.currency
                })
            )
            getClientPayments({
                variables: {
                    id: Number(selectedProject.id)
                }
            })
            setNewAllocation({
                payment_id: selectedPayment ? selectedPayment.id : null,
                project_id: selectedProject.id
            })
        }
    }, [selectedProject])
    useEffect(() => {
        setSelectedPayment({ amount: null, date_paid: null })
        if (clientPayments) {
            selectLatestPayment({ payments: clientPayments })
        }
    }, [clientPayments])
    useEffect(() => {
        if (selectedProject) {
            setNewAllocation({
                payment_id: selectedPayment ? selectedPayment.id : null,
                project_id: selectedProject.id
            })
        }
        setPayment(selectedPayment)
    }, [selectedPayment])

    const handleClickPaymentsList = () => {
        setOpenPaymentsList(!openPaymentsList)
    }
    const handleClickProjectsList = () => {
        setOpenProjectsList(!openProjectsList)
    }
    const onClickPayment = ({ payment }) => {
        setSelectedPayment(payment)
        setOpenPaymentsList(false)
    }
    const onClickProject = ({ project }) => {
        setSelectedProject(project)
        setOpenProjectsList(false)
    }
    const selectLatestPayment = ({ payments }) => {
        if (payments) {
            payments.map(p => {
                if (p.date_paid > selectedPayment) {
                    setSelectedPayment(p)
                }
            })
        }
    }

    const listPayments = ({ payments, selectedPayment }) => {
        const unselectedPayments = differenceBy(payments, [selectedPayment], 'id')
        return unselectedPayments.map(payment => {
            const paymentAmount = formatAmount({
                amount: payment.amount / 100,
                currencyInformation: clientCurrency ? clientCurrency : 'USD'
            })
            return (
                <List component='div' disablePadding>
                    <ListItem button onClick={() => onClickPayment({ payment })}>
                        <Grid container>
                            <Grid item xs={3}/>
                            <Grid item xs={3}>
                                <ListItemText primary={
                                    `${payment.amount
                                        ? `${paymentAmount}`
                                        : 'Propose'
                                    }`
                                }
                                />
                            </Grid>
                            <Grid item xs={3} align='center'>
                                <Typography variant='caption' color='secondary'>
                                    {`${payment.date_paid
                                        ? moment(payment.date_paid, 'x').format('MM/DD/YYYY')
                                        : ''
                                    }`}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}/>
                        </Grid>
                    </ListItem>
                </List>
            )
        })
    }

    const listProjects = ({ projects, selectedProject }) => {
        const unselectedProjects = differenceBy(projects, [selectedProject], 'id')
        return unselectedProjects.map(project => {
            return (
                <List component='div' disablePadding>
                    <ListItem button onClick={() => onClickProject({ project })}>
                        <Grid container>
                            <Grid item xs={3}/>
                            <Grid item xs={3}>
                                <ListItemText primary={`${project.name}`}/>
                            </Grid>
                            <Grid item xs={3} align='center'>
                                <Typography variant='caption' color='secondary'>
                                    {`${last(split(project.client.name, '/'))}`}
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
            )
        })
    }

    if (loadingProjects) return <LoadingProgress/>
    if (errorProjects) return 'Error!'

    const { getProjects: projects } = dataProjects

    const paymentAmount = formatAmount({
        amount: selectedPayment ? selectedPayment.amount / 100 : null,
        currencyInformation: clientCurrency ? clientCurrency : 'USD'
    })

    return (
        <Box className='AllocationProposeSpecifics'>
            <Grid container justify='center'>
                <Grid item xs={12}>
                    <List component='nav'>
                        <ListItem>
                            <Grid container>
                                <Grid item xs={3}>
                                    <PeopleIcon color='primary'/>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>
                                        {`${contributor.name}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} align='center'>
                                    <Typography variant='caption' color='secondary'>
                                        {`${last(split(contributor.github_handle, '/'))}`}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12}>
                    <List component='nav'>
                        <ListItem button onClick={handleClickProjectsList}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <AssessmentIcon color='primary'/>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>
                                        {selectedProject ? selectedProject.name : 'No selected'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} align='center'>
                                    <Typography variant='caption' color='secondary'>
                                        {`${selectedProject
                                            ? last(split(selectedProject.client.name, '/'))
                                            : ''
                                        }`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} align='right'>
                                    {openProjectsList
                                        ? <ExpandLess />
                                        : <ExpandMore />
                                    }
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Collapse in={openProjectsList} timeout='auto' unmountOnExit>
                            {listProjects({
                                projects,
                                selectedProject: selectedProject
                            })}
                        </Collapse>
                    </List>
                </Grid>
                <Grid item xs={12}>
                    <List component='nav'>
                        <ListItem button onClick={handleClickPaymentsList}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <PaymentIcon color='primary'/>
                                </Grid>
                                <Grid item xs={3}>
                                    <ListItemText primary={
                                        `${selectedPayment && selectedPayment.amount
                                            ? `${paymentAmount}`
                                            : 'Propose'
                                        }`
                                    }
                                    />
                                </Grid>
                                <Grid item xs={3} align='center'>
                                    <Typography variant='caption' color='secondary'>
                                        {`${selectedPayment &&
                                            selectedPayment.date_paid
                                            ? moment(selectedPayment.date_paid, 'x').format('MM/DD/YYYY')
                                            : ''
                                        }`}
                                        {`${
                                            selectedPayment && (
                                                !selectedPayment.date_paid && selectedPayment.date_incurred
                                                    ? 'Warning: This payment has not been paid'
                                                    : ''
                                            )
                                        }`}
                                    </Typography>
                                </Grid>

                                <Grid item xs={3} align='right'>
                                    {openPaymentsList
                                        ? <ExpandLess />
                                        : <ExpandMore />
                                    }
                                </Grid>

                            </Grid>
                        </ListItem>
                        <Collapse in={openPaymentsList} timeout='auto' unmountOnExit>
                            { clientPayments.length > 0 &&
                                    listPayments({ payments: clientPayments, selectedPayment: selectedPayment })}
                        </Collapse>

                    </List>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AllocationProposeSpecifics

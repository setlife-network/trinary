import React, { useEffect, useState } from 'react'
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
import GitHubIcon from '@material-ui/icons/GitHub'
import PaymentIcon from '@material-ui/icons/Payment'
import PeopleIcon from '@material-ui/icons/Group'
import moment from 'moment'
import {
    difference,
    differenceWith,
    isEqual,
    last,
    split
} from 'lodash'
import accounting from 'accounting-js'

import {
    formatAmount,
    selectCurrencyInformation,
    selectCurrencySymbol
} from '../scripts/selectors'

const AllocationAddSpecifics = (props) => {

    const {
        contributor,
        contributors,
        currency,
        project,
        payment,
        payments,
        selectedContributor,
        setNewAllocation,
        setContributor,
        setPayment
    } = props

    const [contributorGithubUser, setContributorGithubUser] = useState(null)
    const [openContributors, setOpenContributors] = useState(false)
    const [openPayments, setOpenPayments] = useState(false)
    const [projectGithubRepo, setProjectGithubRepo] = useState(null)
    const [selectedPayment, setSelectedPayment] = useState(payment ? payment : payments[0])

    const handleClickContributors = () => {
        setOpenContributors(!openContributors)
    }

    const handleClickPayments = () => {
        setOpenPayments(!openPayments)
    }

    useEffect(() => {
        setProjectGithubRepo(last(split(project.github_url, '/')))
        setContributorGithubUser(last(split(selectedContributor.github_handle, '/')))
    }, [])

    useEffect(() => {
        setContributorGithubUser(last(split(selectedContributor.github_handle, '/')))
    }, [selectedContributor])

    useEffect(() => {
        if (!payment && !selectedPayment) {
            selectLatestPayment({ payments })
        }
        setNewAllocation({
            payment_id: selectedPayment ? selectedPayment.id : null,
            contributor_id: selectedContributor.id
        })
        setPayment(selectedPayment)
    }, [selectedPayment])

    const currencyInformation = selectCurrencyInformation({
        currency: currency
    })
    const selectLatestPayment = (props) => {
        if (props) {
            props.payments.map(p => {
                if (p.date_paid > selectedPayment) {
                    setSelectedPayment(p)
                }
            })
        }
    }
    const onClickPayment = (payment) => {
        setSelectedPayment(payment)
        setOpenPayments(false)
    }
    const onClickContributor = (contributor) => {
        setContributor(contributor)
        setOpenContributors(false)
    }

    const listPayments = (payments) => {
        const paymentsList = differenceWith(payments, [selectedPayment], isEqual)
        return paymentsList.map(p => {
            const paymentAmount = formatAmount({
                amount: p.amount / 100,
                currencyInformation: currencyInformation
            })
            return (
                <List component='div' disablePadding>
                    <ListItem button onClick={() => onClickPayment(p)}>
                        <Grid container>
                            <Grid item xs={3}/>
                            <Grid item xs={3}>
                                <ListItemText primary={
                                    `${p.amount
                                        ? `${paymentAmount}`
                                        : 'Propose'
                                    }`
                                }
                                />
                            </Grid>
                            <Grid item xs={3} align='center'>
                                <Typography variant='caption' color='secondary'>
                                    {`${p.date_paid
                                        ? moment(p.date_paid, 'x').format('MM/DD/YYYY')
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

    const listContributors = (contributors) => {
        const contributorsList = differenceWith(contributors, [selectedContributor])
        return contributorsList.map(c => {
            return (
                <List component='div' disablePadding>
                    <ListItem button onClick={() => onClickContributor(c)}>
                        <Grid container>
                            <Grid item xs={3}/>
                            <Grid item xs={3}>
                                <ListItemText primary={`${c.name}`}/>
                            </Grid>
                            <Grid item xs={3} align='center'>
                                <Typography variant='caption' color='secondary'>
                                    {`${last(split(c.github_handle, '/'))}`}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                {
                                    c.github_access_token &&
                                    <GitHubIcon color='secondary' fontSize='small'/>
                                }

                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
            )
        })
    }

    return (
        <Box className='AllocationAddSpecifics'>
            <Grid container justify='center'>
                <ListItem button>
                    <Grid item xs={3}>
                        <AssessmentIcon color='primary'/>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>
                            {project.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} align='center'>
                        <Typography variant='caption' color='secondary'>
                            {projectGithubRepo}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} align='right'>
                        <GitHubIcon color='secondary' fontSize='small'/>
                    </Grid>
                </ListItem>

                <Grid item xs={12}>
                    <List component='nav'>
                        <ListItem button onClick={handleClickContributors}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <PeopleIcon color='primary'/>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>
                                        {selectedContributor ? selectedContributor.name : ''}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} align='center'>
                                    <Typography variant='caption' color='secondary'>
                                        {contributorGithubUser}
                                    </Typography>
                                </Grid>
                                {
                                    !contributor &&
                                    <Grid item xs={3} align='right'>
                                        {openContributors
                                            ? <ExpandLess />
                                            : <ExpandMore />
                                        }
                                    </Grid>
                                }
                            </Grid>
                        </ListItem>
                        {
                            !contributor &&
                            <Collapse in={openContributors} timeout='auto' unmountOnExit>
                                {listContributors(contributors)}
                            </Collapse>
                        }
                    </List>
                </Grid>
                <Grid item xs={12}>
                    <List component='nav'>
                        <ListItem button onClick={handleClickPayments}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <PaymentIcon color='primary'/>
                                </Grid>
                                <Grid item xs={3}>
                                    <ListItemText primary={
                                        `${selectedPayment.amount
                                            ? `${formatAmount({
                                                amount: selectedPayment.amount / 100,
                                                currencyInformation: currencyInformation
                                            })}`
                                            : 'Propose'
                                        }`
                                    }
                                    />
                                </Grid>
                                <Grid item xs={3} align='center'>
                                    <Typography variant='caption' color='secondary'>
                                        {`${selectedPayment.date_paid
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
                                {
                                    !payment &&
                                    <Grid item xs={3} align='right'>
                                        {openPayments
                                            ? <ExpandLess />
                                            : <ExpandMore />
                                        }
                                    </Grid>
                                }
                            </Grid>
                        </ListItem>
                        {!payment &&
                            <Collapse in={openPayments} timeout='auto' unmountOnExit>
                                {payments.length > 1 &&
                                    listPayments(payments)}
                            </Collapse>
                        }
                    </List>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AllocationAddSpecifics

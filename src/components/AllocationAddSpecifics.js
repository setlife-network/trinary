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
    differenceWith,
    last,
    split
} from 'lodash'

const AllocationAddSpecifics = (props) => {

    const {
        contributor,
        contributors,
        project,
        payment,
        payments,
        setNewAllocation,
        setContributor,
        setPayment
    } = props

    const [contributorGithubUser, setContributorGithubUser] = useState(null)
    const [openContributors, setOpenContributors] = useState(false)
    const [openPayments, setOpenPayments] = useState(false)
    const [projectGithubRepo, setProjectGithubRepo] = useState(null)
    const [selectedPayment, setSelectedPayment] = useState(payment ? payment : payments[0])
    const [selectedContributor, setSelectedContributor] = useState(contributor ? contributor : contributors[0])

    const handleClickContributors = () => {
        setOpenContributors(!openContributors)
    }

    const handleClickPayments = () => {
        setOpenPayments(!openPayments)
    }

    useEffect(() => {
        if (contributor) {
            setSelectedContributor(contributor)
        }
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

    const selectLatestPayment = (props) => {
        props.payments.map(p => {
            if (p.date_paid > selectedPayment) {
                setSelectedPayment(p)
            }
        })
    }

    const onClickPayment = (payment) => {
        setSelectedPayment(payment)
        setOpenPayments(false)
    }

    const onClickContributor = (contributor) => {
        setSelectedContributor(contributor)
        setContributor(contributor)
        setOpenContributors(false)
    }

    const listPayments = (payments) => {
        const paymentsList = differenceWith(payments, [selectedPayment])
        return paymentsList.map(p => {
            return (
                <List component='div' disablePadding>
                    <ListItem button onClick={() => onClickPayment(p)}>
                        <Grid container>
                            <Grid item xs={3}/>
                            <Grid item xs={3}>
                                <ListItemText primary={`$${p.amount}`}/>
                            </Grid>
                            <Grid item xs={3} align='center'>
                                <Typography variant='caption' color='secondary'>
                                    {`${p.date_paid ? moment(p.date_paid, 'x').format('MM/DD/YYYY') : ''}`}
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
                                    <ListItemText primary={`${selectedPayment.amount
                                        ? `$${selectedPayment.amount}`
                                        : 'Propose'}`}
                                    />
                                </Grid>
                                <Grid item xs={3} align='center'>
                                    <Typography variant='caption' color='secondary'>
                                        {`${selectedPayment.date_paid
                                            ? moment(selectedPayment.date_paid, 'x').format('MM/DD/YYYY')
                                            : ''}`}
                                        {`${
                                            !selectedPayment.date_paid && selectedPayment.date_incurred
                                                ? 'Warning: This payment has not been paid'
                                                : ''
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
                        {
                            !payment &&
                            <Collapse in={openPayments} timeout='auto' unmountOnExit>
                                {listPayments(payments)}
                                {payments &&
                                    <List component='div' disablePadding>
                                        <ListItem button onClick={() => onClickPayment({})}>
                                            <Grid container>
                                                <Grid item xs={3}/>
                                                <Grid item xs={3}>
                                                    <ListItemText primary={`Propose`}/>
                                                </Grid>
                                                <Grid item xs={6}/>
                                            </Grid>
                                        </ListItem>
                                    </List>
                                }
                            </Collapse>
                        }
                    </List>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AllocationAddSpecifics
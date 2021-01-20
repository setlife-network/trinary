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
import { differenceWith, last, split } from 'lodash'

const AllocationAddSpecifics = (props) => {

    const {
        contributor,
        project,
        payments,
        setNewAllocation
    } = props

    const [selectedPayment, setSelectedPayment] = useState(payments[0])
    const [open, setOpen] = useState(false)
    const [projectGithubRepo, setProjectGithubRepo] = useState(null)
    const [contributorGithubUser, setContributorGithubUser] = useState(null)

    const handleClick = () => {
        setOpen(!open)
    }

    useEffect(() => {
        setProjectGithubRepo(last(split(project.github_url, '/')))
        setContributorGithubUser(last(split(contributor.github_handle, '/')))
    }, [])

    useEffect(() => {
        selectLatestPayment({ payments })
        setNewAllocation({
            payment_id: selectedPayment.id,
            contributor_id: contributor.id
        })
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
        setOpen(false)
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
                                    {`${moment(p.date_paid, 'x').format('MM/DD/YYYY')}`}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}/>
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
                <ListItem button>
                    <Grid item xs={3}>
                        <PeopleIcon color='primary'/>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>
                            {contributor.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} align='center'>
                        <Typography variant='caption' color='secondary'>
                            {contributorGithubUser}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} align='right'>
                        <GitHubIcon color='secondary' fontSize='small'/>
                    </Grid>
                </ListItem>
                <Grid item xs={12}>
                    <List component='nav'>
                        <ListItem button onClick={handleClick}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <PaymentIcon color='primary'/>
                                </Grid>
                                <Grid item xs={3}>
                                    <ListItemText primary={`$${selectedPayment.amount}`}/>
                                </Grid>
                                <Grid item xs={3} align='center'>
                                    <Typography variant='caption' color='secondary'>
                                        {`${moment(selectedPayment.date_paid, 'x').format('MM/DD/YYYY')}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} align='right'>
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Collapse in={open} timeout='auto' unmountOnExit>
                            {listPayments(payments)}
                        </Collapse>
                    </List>
                </Grid>

            </Grid>
        </Box>
    )
}

export default AllocationAddSpecifics

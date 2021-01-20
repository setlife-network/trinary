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
        console.log('contributorGithubUser');
        console.log(contributorGithubUser);
        console.log('projectGithubRepo');
        console.log(projectGithubRepo);
    }, [contributorGithubUser])

    useEffect(() => {
        selectLatestPayment({ payments })
        setNewAllocation({
            payment_id: selectedPayment.id,
            contributor_id: contributor.id
        })
        console.log('selectedPayment');
        console.log(selectedPayment);
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
                        <Grid conatiner>
                            <Grid item>
                                <ListItemText primary={`$${p.amount}`}/>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    {`${moment(selectedPayment.date_paid).format('MM/DD/YYYY')}`}
                                </Typography>
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

                <Grid item xs={3}>
                    <AssessmentIcon color='primary'/>
                </Grid>
                <Grid item xs={3}>
                    <Typography>
                        {project.name}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography>
                        {projectGithubRepo}
                    </Typography>
                    <GitHubIcon color='secondary' fontSize='small'/>
                </Grid>
                <Grid item xs={3}>
                </Grid>

                <Grid item xs={3}>
                    <PeopleIcon color='primary'/>
                </Grid>
                <Grid item xs={3}>
                    <Typography>
                        {contributor.name}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography>
                        {contributorGithubUser}
                    </Typography>
                    <GitHubIcon color='secondary' fontSize='small'/>
                </Grid>
                <Grid item xs={3}>
                </Grid>

                <Grid item xs={3}>
                    <PaymentIcon color='primary'/>
                </Grid>
                <Grid item xs={3}>
                    <List component='nav'>
                        <ListItem button onClick={handleClick}>
                            <Grid container>
                                <Grid item>
                                    <ListItemText primary={`$${selectedPayment.amount}`}/>
                                </Grid>
                                <Grid item>
                                    <Typography>
                                        {`${moment(selectedPayment.date_paid).format('MM/DD/YYYY')}`}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Collapse in={open} timeout='auto' unmountOnExit>
                            {listPayments(payments)}
                        </Collapse>
                    </List>
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                </Grid>

            </Grid>
        </Box>
    )
}

export default AllocationAddSpecifics

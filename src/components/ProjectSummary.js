import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Box,
    Button,
    CardActions,
    Grid,
    Icon,
    Typography
} from '@material-ui/core'
import moment from 'moment'

import {
    formatAmount,
    selectCurrencyInformation,
    selectCurrencySymbol
} from '../scripts/selectors'
import ProjectEditDialog from './ProjectEditDialog'

const ProjectSummary = (props) => {

    const {
        project,
        projectId
    } = props
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const history = useHistory()

    const handleEditOpen = () => {
        setOpenEditDialog(true)
    }
    const handleEditClose = (value) => {
        setOpenEditDialog(false)
    }

    const currencyInformation = selectCurrencyInformation({ currency: project.client.currency })
    const expectedBudgetAmount = formatAmount({
        amount: project.expected_budget / 100,
        currencyInformation: currencyInformation
    })
    const totalPaidAmount = formatAmount({
        amount: project.totalPaid / 100,
        currencyInformation: currencyInformation
    })

    const redirectToClient = () => {
        history.push('/clients/' + project.client.id)
    }
    
    return (
        <Box
            px={[1, 3]}
            pt={3}
            borderRadius='borderRadius'
            bgcolor='primary.light_blue'
            fontWeight='fontWeightBold'
            className='ProjectSummary'
        >
            <Grid container justifyContent='center' spacing={2}>
                <Grid item xs={12} sm={10}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={2}>
                                    <Icon className='fas fa-address-card' color='primary'/>
                                </Grid>
                                <Grid xs={10} align='left'>
                                    <Typography 
                                        variant='' 
                                        className='grey-link'
                                        onClick={redirectToClient}
                                    >
                                        <span>
                                            {`Client - ${project.client.name}`}
                                        </span>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={2}>
                                    <Icon className='fas fa-wallet' color='primary'/>
                                </Grid>
                                <Grid xs={10} align='left'>
                                    {`Expected budget - ${expectedBudgetAmount} ${
                                        project.expected_budget_timeframe
                                            ? project.expected_budget_timeframe
                                            : ''
                                    }`}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={2}>
                                    <Icon className='fas fa-money-bill-wave-alt' color='primary'/>
                                </Grid>
                                <Grid xs={10} align='left'>
                                    {`Total paid - ${totalPaidAmount}`}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={2}>
                                    <Icon className='far fa-flag' color='primary'/>
                                </Grid>
                                <Grid xs={10} align='left'>
                                    {`Start date - ${moment.utc(project.date, 'x').format('MM/DD/YYYY')}`}
                                </Grid>
                            </Grid>
                        </Grid>
                        {project.end_date &&
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={2}>
                                        <Icon className='fas fa-flag' color='primary'/>
                                    </Grid>
                                    <Grid xs={10} align='left'>
                                        {`End date - ${moment(project.end_date, 'x').format('MM/DD/YYYY')}`}
                                    </Grid>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={2}
                    align='left'
                >
                    <Box>
                        <Button onClick={handleEditOpen} bgcolor='primary'>
                            {'Edit'.toUpperCase()}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <ProjectEditDialog
                project={project}
                open={openEditDialog}
                onClose={handleEditClose}
            />
        </Box>
    )
}

export default ProjectSummary

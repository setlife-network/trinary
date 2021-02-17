import React, { useState } from 'react'
import {
    Box,
    Button,
    CardActions,
    Grid,
    Icon,
    Typography
} from '@material-ui/core'
import moment from 'moment'
import accounting from 'accounting-js'

import { selectCurrencyInformation, selectCurrencySymbol } from '../scripts/selectors'
import ProjectEditDialog from './ProjectEditDialog'

const ProjectSummary = (props) => {

    const {
        project,
        projectId
    } = props
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const handleEditOpen = () => {
        setOpenEditDialog(true)
    }
    const handleEditClose = (value) => {
        setOpenEditDialog(false)
    }

    const currencyInformation = selectCurrencyInformation({ currency: project.client.currency })
    const expectedBudgetAmount = accounting.formatMoney(
        project.expected_budget / 100,
        {
            symbol: currencyInformation['symbol'],
            thousand: currencyInformation['thousand'],
            decimal: currencyInformation['decimal'],
            format: '%s %v'
        }
    )
    const totalPaidAmount = accounting.formatMoney(
        project.totalPaid / 100,
        {
            symbol: currencyInformation['symbol'],
            thousand: currencyInformation['thousand'],
            decimal: currencyInformation['decimal'],
            format: '%s %v'
        }
    )

    return (
        <Box
            p={3}
            borderRadius='borderRadius'
            bgcolor='primary.light_blue'
            fontWeight='fontWeightBold'
            className='ProjectSummary'
        >
            <Grid container justify='center' spacing={2}>
                <Grid item xs={12} sm={10}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={2}>
                                    <Icon className='fas fa-address-card' color='primary'/>
                                </Grid>
                                <Grid xs={10} align='left'>
                                    {`Client - ${project.client.name}`}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={2}>
                                    <Icon className='fas fa-wallet' color='primary'/>
                                </Grid>
                                <Grid xs={10} align='left'>
                                    {`Expected budget - ${expectedBudgetAmount}`}
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
                                    <Icon className='fas fa-flag' color='primary'/>
                                </Grid>
                                <Grid xs={10} align='left'>

                                    {`Start date - ${moment(project.date, 'x').format('MM/DD/YYYY')}`}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={2}
                    align='left'
                >
                    <Box>
                        <Button onClick={handleEditOpen} color='primary' bgcolor='primary'>
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

import React, { useState } from 'react'
import {
    Box,
    Button,
    CardActions,
    Grid,
    Icon,
    Typography
} from '@material-ui/core'

import ProjectEditDialog from './ProjectEditDialog'

const ProjectSummary = (props) => {

    const { project } = props
    const { projectId } = props
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const handleEditOpen = () => {
        setOpenEditDialog(true)
    }
    const handleEditClose = (value) => {
        setOpenEditDialog(false)
    }

    return (
        <Box
            p={3}
            borderRadius='borderRadius'
            bgcolor='primary.light_blue'
            fontWeight='fontWeightBold'
        >
            <Grid container>
                <Grid item xs={12} md={10}>
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
                                    {`Expected budget - $${project.expected_budget}`}
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={2}>
                                    <Icon className='fas fa-money-bill-wave-alt' color='primary'/>
                                </Grid>
                                <Grid xs={10} align='left'>
                                    {`Total paid - $${project.totalPaid}`}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button onClick={handleEditOpen} color='primary' bgcolor='primary'>
                        {'Edit'.toUpperCase()}
                    </Button>

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

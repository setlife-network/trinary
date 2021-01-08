import React from 'react'
import {
    Box,
    Grid,
    Icon,
    Typography
} from '@material-ui/core'

const ProjectSummary = (props) => {

    const { project } = props

    return (
        <Box
            p={3}
            borderRadius='borderRadius'
            bgcolor='primary.light_blue'
            fontWeight='fontWeightBold'
        >
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
        </Box>
    )
}

export default ProjectSummary

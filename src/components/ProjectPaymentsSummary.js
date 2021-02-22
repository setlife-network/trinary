import React from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'

const ProjectPaymentsSummary = (props) => {

    const {
        project
    } = props

    return (
        <Box
            p={3}
            mb={3}
            borderRadius='borderRadius'
            bgcolor='primary.light_blue'
            fontWeight='fontWeightBold'
            className='ProjectSummary'
        >
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h6'>
                        {`Payments summary`}
                    </Typography>
                    <Typography>
                        {`$ paid from client`}
                    </Typography>
                    <Typography>
                        {`$ allocated`}
                    </Typography>
                    <Typography>
                        {`$ on profit`}
                    </Typography>
                    <Typography>
                        {`$ on allocations not confirmed`}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProjectPaymentsSummary

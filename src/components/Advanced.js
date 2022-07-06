import React, { useState } from 'react'
import {
    Box,
    Grid,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Advanced = (props) => {

    const {
        minimumExpectedHours,
        maximumExpectedHours,
        minimumHourlyRate,
        maximumHourlyRate,
        setMinimumExpectedHours,
        setMaximumExpectedHours,
        setMinimumHourlyRate,
        setMaximumHourlyRate,
        type
    } = props

    const handleRateChange = (value, type) => {
        if (type == 'minimum_expected') {
            setMinimumExpectedHours(value)
        } else if (type == 'maximum_expected') {
            setMaximumExpectedHours(value)
        } else if (type == 'minimum_rate') {
            setMinimumHourlyRate(value)
        } else if (type == 'maximum_rate') {
            setMaximumHourlyRate(value)
        }
    }

    return (
        <Grid container className='Advanced'>
            <Box
                my={3}
                // display={
                //     {
                //         xs: 'none',
                //         sm: 'block'
                //     }
                // }
            >
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography
                            variant='subtitle1'
                        >
                            {'Advanced'}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid item xs={12}>
                            <Box px={2} py={1}>
                                <Grid
                                    container
                                    spacing={2}
                                >
                                    {type == 'prorated_monthly' &&
                                        <Grid item xs={6}>
                                            <TextField
                                                label='Minimum Expected Hours'
                                                variant='filled'
                                                value={`${minimumExpectedHours 
                                                    ? minimumExpectedHours 
                                                    : ''
                                                }`}
                                                fullWidth
                                                // error={error}
                                                // helperText={error}
                                                onChange={(event) => handleRateChange(event.target.value, 'minimum_expected')}
                                            />
                                        </Grid>
                                    }
                                    {type == 'prorated_monthly' &&
                                        <Grid item xs={6}>
                                            <TextField
                                                label='Maximum Expected Hours'
                                                variant='filled'
                                                value={`${maximumExpectedHours 
                                                    ? maximumExpectedHours 
                                                    : ''
                                                }`}
                                                fullWidth
                                                // error={error}
                                                // helperText={error}
                                                onChange={(event) => handleRateChange(event.target.value, 'maximum_expected')}
                                            />
                                        </Grid>
                                    }
                                    {type == 'max_budget' &&
                                        <Grid item xs={6}>
                                            <TextField
                                                label='Minimum Hourly Rate'
                                                variant='filled'
                                                value={`${minimumHourlyRate
                                                    ? minimumHourlyRate
                                                    : ''
                                                }`}
                                                fullWidth
                                                // error={error}
                                                // helperText={error}
                                                onChange={(event) => handleRateChange(event.target.value, 'minimum_rate')}
                                            />
                                        </Grid>
                                    }
                                    {type == 'max_budget' &&
                                        <Grid item xs={6}>
                                            <TextField
                                                label='Maximum Hourly Rate'
                                                variant='filled'
                                                value={`${maximumHourlyRate
                                                    ? maximumHourlyRate
                                                    : ''
                                                }`}
                                                fullWidth
                                                // error={error}
                                                // helperText={error}
                                                onChange={(event) => handleRateChange(event.target.value, 'maximum_rate')}
                                            />
                                        </Grid>
                                    }
                                </Grid>
                            </Box>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Grid>
    )
}

export default Advanced

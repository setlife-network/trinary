import React, { useState } from 'react';
import {
    Box,
    Grid,
    Icon,
    Typography
} from '@material-ui/core'
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const EmptyState = (props) => {
    const {
        description,
        iconClassName
    } = props

    return (
        <Grid container justify='center' className='EmptyState'>
            <Box mt={5}>
                <Typography color='secondary' variant='h6'>
                    {`${description}`}
                </Typography>
                <Box mt={5} align='center'>
                    <Icon className={`${iconClassname} empty-icon`} color='secondary'/>
                </Box>
            </Box>
        </Grid>
    )
}

export default EmptyState

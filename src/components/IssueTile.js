import React, { useState } from 'react'
import {
    Box,
    Grid
} from '@material-ui/core'

const IssueTile = (props) => {

    const { issue } = props

    console.log('issue');
    console.log(issue);

    return (
        <Box
            className='IssueTile'
            borderRadius='borderRadius'
            boxShadow={3}
            p={3}
            my={3}
        >
            IssueTile
        </Box>
    );
}

export default IssueTile

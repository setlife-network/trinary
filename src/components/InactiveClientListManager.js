import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import { useQuery } from '@apollo/client';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import LoadingProgress from './LoadingProgress'
import { GET_INACTIVE_CLIENTS_COUNT } from '../operations/queries/ClientQueries'
import InactiveClientsList from "./InactiveClientsList";

const InactiveClientListManager = (props) => {

    const { loading, error, data } = useQuery(GET_INACTIVE_CLIENTS_COUNT);

    if (loading) return <LoadingProgress/>
    if (error) return `Error! ${error.message}`;
    return (
        <Box
            mb={3}
            mx={1}
            className='ClientListManager'
        >
            {
                data.getInactiveClientsCount != 0
                    ? (
                       <InactiveClientsList />
                    ) : ( false )
            }

        </Box>

    )
}

export default InactiveClientListManager

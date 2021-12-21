import React from 'react'
import Box from '@material-ui/core/Box';
import { useQuery } from '@apollo/client';

import LoadingProgress from './LoadingProgress'
import { GET_INACTIVE_CLIENTS_COUNT } from '../operations/queries/ClientQueries'
import InactiveClientsList from './InactiveClientsList'

const InactiveClientListManager = (props) => {

    const { loading, error, data } = useQuery(GET_INACTIVE_CLIENTS_COUNT, {
        fetchPolicy: 'cache-and-network'
    });

    if (loading) return <LoadingProgress/>
    if (error) return `Error! ${error.message}`;
    return (
        <Box
            mb={3}
            mx={1}
            className='InactiveClientListManager'
        >
            {
                data.getInactiveClientsCount != 0
                    ? <InactiveClientsList />
                    : null
            }

        </Box>

    )
}

export default InactiveClientListManager

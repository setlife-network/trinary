import React from 'react'
import Box from '@material-ui/core/Box';
import { useQuery } from '@apollo/client';

import LoadingProgress from './LoadingProgress'
import { GET_INACTIVE_CLIENTS_COUNT } from '../operations/queries/ClientQueries'
import InactiveClientsList from './InactiveClientsList'

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
                    ? <InactiveClientsList />
                    : null
            }

        </Box>

    )
}

export default InactiveClientListManager

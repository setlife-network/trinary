import React from 'react'
import Box from '@material-ui/core/Box';
import { useQuery } from '@apollo/client';

import LoadingProgress from './LoadingProgress'
import { GET_INACTIVE_PROJECTS_COUNT } from '../operations/queries/ProjectQueries';
import InactiveProjectsList from './InactiveProjectsList';

const InactiveProjectListManager = (props) => {

    const { loading, error, data } = useQuery(GET_INACTIVE_PROJECTS_COUNT, {
        fetchPolicy: 'cache-and-network'
    });

    if (loading) return <LoadingProgress/>
    if (error) return `Error! ${error.message}`;

    return (
        <Box
            mb={3}
            mx={1}
            className='ProjectListManager'
        >
            {
                data.getInactiveProjectsCount != 0
                    ? <InactiveProjectsList />
                    : null
            }

        </Box>

    )
}

export default InactiveProjectListManager

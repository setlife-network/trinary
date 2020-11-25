import React from 'react'
import { gql, useQuery } from '@apollo/client';

import ClientTile from './ClientTile'

import { GET_CLIENTS } from '../operations/queries/ClientQueries'

const ProjectsList = () => {

    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) {
        return (
            <>
                Loading...
            </>
        )
    }

    if (error) return `Error! ${error.message}`;
    console.log('data');
    console.log(data);
    return (
        data.getClients.map(c => {
            return (
                <ClientTile
                    clientName={c.name}
                />
            )
        })
    )
}

export default ProjectsList

import React from 'react'
import { gql, useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid'

import ClientTile from './ClientTile'

import { GET_CLIENTS } from '../operations/queries/ClientQueries'

const ProjectsList = () => {

    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) {
        return (
            <Grid item xs={12}>
                Loading...
            </Grid>
        )
    }

    if (error) return `Error! ${error.message}`;
    console.log('data');
    console.log(data);
    return (
        data.getClients.map(c => {
            return (
                <Grid item xs={12} lg={4}>
                    <ClientTile
                        clientName={c.name}
                    />
                </Grid>
            )
        })
    )
}

export default ProjectsList

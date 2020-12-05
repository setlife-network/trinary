import React from 'react'
import { gql, useQuery, useApolloClient, ApolloProvider, ApolloConsumer } from '@apollo/client';
import Grid from '@material-ui/core/Grid'
import { orderBy } from 'lodash'

import { GET_POJECTS } from '../operations/queries/ProjectQueries'
import ProjectsList from './ProjectsList'
//import { client } from '../index'

const ClientProjectsListManager = ({
    clientId,
    history
}) => {

    const apolloClient = useApolloClient()
    console.log('apolloClient.cache.data.data');
    console.log(apolloClient.cache.data.data);
    const client = apolloClient.cache.data.data.['Client:2']
    // console.log('client');
    // console.log(client);
    // console.log('client.cache.data.data');
    // console.log(client.cache.data.data);
    // console.log(client.readQuery());

    // const { loading, error, data } = client.readQuery({
    //     query: gql`
    //         query Client {
    //             getClientById(id: 1){
    //                 id,
    //                 name,
    //                 email,
    //                 currency,
    //                 is_active
    //             }
    //         }
    //     `
    // })

    // const client = client.cache.data.data.client

    // if (loading) {
    //     return (
    //         <Grid item xs={12}>
    //             Loading...
    //         </Grid>
    //     )
    // }
    // if (error) return `Error! ${error.message}`;
    //const projects = orderBy(data.getProjects, ['is_active'], ['desc'])
    // console.log('data');
    // console.log(client.projects);
    // const projects = client.projects
    // return (
    //     <ProjectsList
    //         history={history}
    //         projects={projects}
    //     />
    // )
}

export default ClientProjectsListManager

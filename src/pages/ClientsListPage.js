import React from 'react'
import { useQuery, gql, NetworkStatus } from '@apollo/client';

const GET_CLIENTS = gql`
    query Clients {
        getClients {
              id
              name
              currency
        }
    }
`;

const MOCKED_CLIENTS = [
    {
        name: 'Client A'
    },
    {
        name: 'Client B'
    },
    {
        name: 'Client C'
    },
]

// Convert to imported component as ClientTile.js when ready to merge
const ClientTile = (props) => {
    const { client } = props

    // Log the `client` object to confirm its data structure

    return (
        <div className='ClientTile'>
            ClientTile
        </div>
    )

}

function ClientListPage({ currency_code }) {

    const { loading, error, data } = useQuery(GET_CLIENTS, {

    })
    if (loading) return <h1>Loading... </h1>
    if (error) return <h1>{`${error}`}</h1>
    console.log('data');
    console.log(data);
    return data.getClients.map(c => {
        return (
            <h1>
                {c.name}
            </h1>
        )

    })

}

export default ClientListPage

import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client';

import { GET_CLIENTS } from '../operations/queries/ClientQueries'

const CREATE_CLIENT = gql`
    mutation CreateClient(
        $name: String!,
        $currency: String!,
        $is_active: Boolean!
    ){
        createClient(createFields:{
            name: $name,
            currency:$currency,
            is_active: $is_active
        }){
            id,
            name,
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

function RenderClientsList() {
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

function ClientListPage() {
    let input;
    const [createClient, { loading, error, data }] = useMutation(CREATE_CLIENT, {
        update (cache, { data }) {
            const newClient = data?.createClient.client
            const existingClients = cache.readQuery({
                query: GET_CLIENTS
            });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: [
                        ...existingClients?.clients,
                        newClient
                    ]
                }
            })
        }
    });

    const onSubmit = (e) => {
        createClient({
            variables: {
                name: document.getElementById('clientName').value,
                currency: document.getElementById('clientCurrency').value,
                is_active: true
            }
        });
    }

    if (loading) return <h1>'Loading...'</h1>
    if (error) return 'Error'
    return (
        <div>
            {RenderClientsList()}
            <form
                onSubmit={(e) => {
                    onSubmit()
                    document.getElementById('clientName').value = ''
                    document.getElementById('clientCurrency').value = ''
                    document.getElementById('clientActive').value = ''
                    e.preventDefault();

                }}
            >
                <input id='clientName'/>
                <input id='clientCurrency'/>
                <input id='clientActive'/>
                <button type='submit'>Add Todo</button>
            </form>
        </div>
    )
}

export default ClientListPage

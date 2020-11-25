import React from 'react'

import ProjectsList from '../components/ProjectsList'

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

class ClientListPage extends React.Component {
    componentDidMount() {}

    renderClients = () => {
        // TODO:
        // fetch clients from API
        // store them in state
        // replace the mocked array

        return MOCKED_CLIENTS.map(c => {
            return (
                <ClientTile
                    client={c}
                />
            )
        })
    }

    render() {
        return (
            <div className='ClientListPage'>
                <h1>ClientListPage</h1>
                <ProjectsList/>
            </div>
        )
    }
}

export default ClientListPage

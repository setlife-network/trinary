import React from 'react'
import Grid from '@material-ui/core/Grid'

import ClientsListManager from '../components/ClientsListManager'
import ClientsList from '../components/ClientsList'

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
                <Grid container direction='row' justify='center'>
                    <Grid item xs={10}>
                        <ClientsListManager
                            history={this.props.history}
                        />
                        <Grid container>
                            <ClientsList
                                history={this.props.history}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default ClientListPage

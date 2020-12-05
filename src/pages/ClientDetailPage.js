import React from 'react'
import Grid from '@material-ui/core/Grid'

import ClientInfo from '../components/ClientInfo'
import ClientProjectsListManager from '../components/ClientProjectsListManager'

class ClientDetailPage extends React.Component {
    componentDidMount() {}

    render() {
        return (
            <Grid container justify='center' className='ClientDetailPage'>
                <Grid item xs={5}>
                    <ClientInfo
                        clientId={this.props.match.params.clientId}
                    />
                    <ClientProjectsListManager
                        clientId={this.props.match.params.clientId}
                        history={this.props.history}
                    />
                </Grid>
            </Grid>
        )
    }
}

export default ClientDetailPage

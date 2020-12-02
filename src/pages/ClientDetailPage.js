import React from 'react'
import Grid from '@material-ui/core/Grid'

import ClientInfo from '../components/ClientInfo'

class ClientDetailPage extends React.Component {
    componentDidMount() {}

    render() {
        return (
            <Grid container justify='center' className='ClientDetailPage'>
                <Grid item xs={5}>
                    <ClientInfo
                        clientId={this.props.match.params.clientId}
                    />
                </Grid>
            </Grid>
        )
    }
}

export default ClientDetailPage

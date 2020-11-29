import React from 'react'
import Grid from '@material-ui/core/Grid'

import ClientsListManager from '../components/ClientsListManager'
import ClientsList from '../components/ClientsList'

class ClientListPage extends React.Component {

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

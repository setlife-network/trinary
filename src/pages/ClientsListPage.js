import React from 'react'
import { Grid } from '@material-ui/core'

import ClientsListManager from '../components/ClientsListManager'
import ClientsList from '../components/ClientsList'
import InactiveClientListManager from '../components/InactiveClientListManager'
import InactiveClientsList from '../components/InactiveClientsList'

class ClientListPage extends React.Component {
    render() {
        return (
            <div>
                <Grid
                    container
                    justifyContent='center'
                    className='ClientListPage'
                >
                    <Grid item xs={12}>
                        <ClientsListManager />
                        <Grid container>
                            <ClientsList />
                        </Grid>
                        <InactiveClientListManager />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default ClientListPage

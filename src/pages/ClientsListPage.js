import React from 'react'
import { Grid } from '@material-ui/core'

import ClientsListManager from '../components/ClientsListManager'
import ClientsList from '../components/ClientsList'
import { pageName } from '../reactivities/variables'

class ClientListPage extends React.Component {

    render() {

        const {
            history
        } = this.props
        pageName('Clients')
        return (
            <div>
                <Grid
                    container
                    justify='center'
                    className='ClientListPage'
                >
                    <Grid item xs={12}>
                        <ClientsListManager
                            history={history}
                        />
                        <Grid container>
                            <ClientsList
                                history={history}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default ClientListPage

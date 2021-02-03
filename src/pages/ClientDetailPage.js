import React from 'react'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'

import ClientInfo from '../components/ClientInfo'
import ClientProjectsList from '../components/ClientProjectsList'
import ProjectsListManager from '../components/ProjectsListManager'
import ClientPaymentsManager from '../components/ClientPaymentsManager'
import ClientPayments from '../components/ClientPayments'
import { pageName } from '../reactivities/variables'

class ClientDetailPage extends React.Component {

    render() {

        const { clientId } = this.props.match.params
        pageName('Client')
        return (
            <Grid
                container
                justify='center'
                className='ClientDetailPage'
            >
                <Grid item xs={8} lg={5}>
                    <ClientInfo
                        clientId={clientId}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Box my={5}>
                        <Typography align='left' variant='h4'>
                            <strong>
                                Projects
                            </strong>
                        </Typography>
                        <ProjectsListManager
                            clientId={clientId}
                            history={this.props.history}
                        />
                        <ClientProjectsList
                            clientId={clientId}
                            history={this.props.history}
                        />
                        <ClientPaymentsManager
                            clientId={clientId}
                        />
                        <ClientPayments
                            clientId={clientId}
                        />
                    </Box>
                </Grid>
            </Grid>
        )
    }
}

export default ClientDetailPage

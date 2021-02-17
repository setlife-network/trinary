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

class ClientDetailPage extends React.Component {

    render() {

        const { clientId } = this.props.match.params

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
                    <Box my={5} py={3}>
                        <Typography align='left' variant='h4'>
                            <strong>
                                {`Projects`}
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
                    </Box>
                    <Box my={5} py={3}>
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

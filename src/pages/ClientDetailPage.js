import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import ClientInfo from '../components/ClientInfo'
import ClientProjectsListManager from '../components/ClientProjectsListManager'
import ProjectsListManager from '../components/ProjectsListManager'

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
                    <Box mt={5}>
                        <Typography align='left' variant='h4'>
                            <strong>
                                Projects
                            </strong>
                        </Typography>
                        <ProjectsListManager
                            clientId={clientId}
                            history={this.props.history}
                        />
                        <ClientProjectsListManager
                            clientId={clientId}
                            history={this.props.history}
                        />
                    </Box>
                </Grid>
            </Grid>
        )
    }
}

export default ClientDetailPage

import React from 'react'
import {
    Box,
    Button,
    Grid,
    Typography
} from '@material-ui/core'
import { Route, withRouter, Redirect } from 'react-router-dom'

import { white } from '../styles/colors.scss'
import ProjectsListPage from './ProjectsListPage'
import ClientsListPage from './ClientsListPage'

class HomePage extends React.Component {

    updateURL = (params) => {
        this.props.history.push(`/home/${params.subdirectory}`)
    }

    render() {

        const { list } = this.props.match.params
        const { match } = this.props

        return (
            <Grid
                container
                justify='center'
                alignItems='center'
                className='HomePage'
            >
                <Grid item xs={10}>
                    <Grid
                        container
                        justify='space-between'
                        alignItems='center'
                        xs={12}
                    >
                        <Grid item xs={6}>
                            <Box mr={1} mr-lg={3} ml={1}>
                                <Button
                                    fullWidth
                                    variant={list == 'clients' ? 'contained' : 'outlined'}
                                    color='primary'
                                    onClick={() => this.updateURL({ subdirectory: 'clients' })}
                                >
                                    <Box color={`${list == 'clients' ? 'white' : ''}`}>
                                        <Typography variant='h6'>
                                            <strong>
                                                Clients
                                            </strong>
                                        </Typography>
                                    </Box>
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box ml={1} ml-lg={3} mr={1}>
                                <Button
                                    fullWidth
                                    variant={list == 'projects' ? 'contained' : 'outlined'}
                                    color='primary'
                                    onClick={() => this.updateURL({ subdirectory: 'projects' })}
                                >
                                    <Box color={`${list == 'projects' ? 'white' : ''}`}>
                                        <Typography variant='h6'>
                                            <strong>
                                                Projects
                                            </strong>
                                        </Typography>
                                    </Box>
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        <Route
                            path={`/home/projects`}
                            render={(props) => <ProjectsListPage {...props} />}
                        />
                        <Route
                            path={`/home/clients`}
                            render={(props) => <ClientsListPage {...props} />}
                        />
                    </Box>
                </Grid>
            </Grid>
        )
    }
}

export default HomePage

import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Header from '../components/Header'
import ProjectsListPage from './ProjectsListPage'
import ClientsListPage from './ClientsListPage'

class HomePage extends React.Component {

    updateURL = (params) => {
        this.props.history.push(`/home/${params.subdirectory}`)
    }

    render() {
        const { list } = this.props.match.params
        return (
            <Grid
                container
                className='HomePage'
                justify='center'
                alignItems='center'
            >
                <Header
                    title='Home'
                    direction='row'
                    justify='center'
                    alignItems='center'
                />
                <Grid item xs={10}>
                    <Grid
                        container
                        justify='space-between'
                        alignItems='center'
                        xs={12}
                    >
                        <Grid item xs={6}>
                            <Box mr={3} ml={1}>
                                <Button
                                    fullWidth
                                    variant={list == 'projects' ? 'contained' : 'outlined'}
                                    color='primary'
                                    onClick={() => this.updateURL({ subdirectory: 'projects' })}
                                >
                                    <Typography variant='h6'>
                                        <strong>
                                            Projects
                                        </strong>
                                    </Typography>
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box ml={3} mr={1}>
                                <Button
                                    fullWidth
                                    variant={list == 'clients' ? 'contained' : 'outlined'}
                                    color='primary'
                                    onClick={() => this.updateURL({ subdirectory: 'clients' })}
                                >
                                    <Typography variant='h6'>
                                        <strong>
                                            Clients
                                        </strong>
                                    </Typography>
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        {
                            list == 'projects'
                                ? (
                                    <ProjectsListPage {...this.props}/>
                                )
                                : (
                                    <ClientsListPage {...this.props}/>
                                )
                        }
                    </Box>
                </Grid>
            </Grid>
        )
    }
}

export default HomePage

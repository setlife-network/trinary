import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
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
                        <Grid item xs={5}>
                            <Button
                                fullWidth
                                variant={list == 'projects' ? 'contained' : 'outlined'}
                                color='primary'
                                onClick={() => this.updateURL({ subdirectory: 'projects' })}
                            >
                                <Typography color='action'>
                                    Projects
                                </Typography>

                            </Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Button
                                fullWidth
                                variant={list == 'clients' ? 'contained' : 'outlined'}
                                color='primary'
                                onClick={() => this.updateURL({ subdirectory: 'clients' })}
                            >
                                Clients
                            </Button>
                        </Grid>
                    </Grid>
                    {
                        list == 'projects'
                            ? (
                                <ProjectsListPage {...this.props}/>
                            )
                            : (
                                <ClientsListPage {...this.props}/>
                            )
                    }
                </Grid>

            </Grid>
        )
    }
}

export default HomePage

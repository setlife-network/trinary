import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import Header from '../components/Header'
import ProjectsListPage from './ProjectsListPage'
import ClientsListPage from './ClientsListPage'

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: this.props.match.params.list
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.fetchData(this.props.userID);
        }
    }

    render() {
        console.log('this.state');
        console.log(this.state.list);
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
                                variant={this.state.list == 'projects' ? 'contained' : 'outlined'}
                                color='primary'
                                onClick={() => this.setState({ list: 'projects' })}
                            >
                                <Typography color='action'>
                                    Projects
                                </Typography>

                            </Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Button
                                fullWidth
                                variant={this.state.list == 'clients' ? 'contained' : 'outlined'}
                                color='primary'
                                onClick={() => this.setState({ list: 'clients' })}
                            >
                                Clients
                            </Button>
                        </Grid>
                    </Grid>
                    {
                        this.state.list == 'projects'
                            ? (
                                <ProjectsListPage/>
                            )
                            : (
                                <ClientsListPage/>
                            )
                    }
                </Grid>

            </Grid>
        )
    }
}

export default HomePage

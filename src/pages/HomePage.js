import React from 'react'
import Grid from '@material-ui/core/Grid';

import Header from '../components/Header'

class HomePage extends React.Component {
    componentDidMount() {}

    render() {
        return (
            <Grid container className='HomePage'>
                <Grid item xs={12}>
                    <Header
                        title='Home'
                    />
                </Grid>

            </Grid>
        )
    }
}

export default HomePage

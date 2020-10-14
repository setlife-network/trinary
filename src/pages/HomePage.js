import React from 'react'
import Grid from '@material-ui/core/Grid';

import HeaderBanner from '../components/HeaderBanner'

class HomePage extends React.Component {
    componentDidMount() {}

    render() {
        return (
            <Grid container className='HomePage'>
                <Grid item xs={12}>
                    <HeaderBanner/>
                    
                </Grid>

            </Grid>
        )
    }
}

export default HomePage

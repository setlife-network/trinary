import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { spacing } from '@material-ui/system';


class HomePage extends React.Component {
    componentDidMount() {

    }
    render() {
        return (
            <div className='HomePage'>

                <Grid container spacing={3}>

                    <Grid item xs={12} style={{background:'red'}}>
                        {`HomePage`}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper>xs=12 sm=6</Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} m={5} style={{background:'green'}}>

                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper>xs=6 sm=3</Paper>
                    </Grid>
                </Grid>

            </div>
        )
    }
}

export default HomePage

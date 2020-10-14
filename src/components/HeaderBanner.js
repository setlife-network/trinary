import React from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        width: ' 100%',
        height: '100px',
        background: 'white',
        transform: 'scaleX(1.1)',
        borderRadius: ' 50% 50% 0 0/ 100% 100% 0 0',
    }
});

const HeaderBanner = ({
    theme
}) => {
    const classes = useStyles();
    return (
        <Grid container id='HeaderBanner'>
            <Grid item xs={12}>
                <Box bgcolor='primary.main'>
                    <Box p={5}>
                        SetLife
                    </Box>
                    <Grid container className={classes.container}/>
                </Box>
            </Grid>

        </Grid>
    )
}

export default HeaderBanner

import React from 'react'
import Grid from '@material-ui/core/Grid';

const HeaderBanner = ({
    theme
}) => {
    return (
        <Grid container id='HeaderBanner'>
            <Grid item xs={12} className={theme.primary}>
                SetLife
            </Grid>
        </Grid>
    )
}

export default HeaderBanner

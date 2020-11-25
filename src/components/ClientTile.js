import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'

const ClientTile = ({
    clientName
}) => {

    return (
        <div className='ClientTile'>
            <Card>
                <Grid spacing={2}>
                    {clientName}
                </Grid>
            </Card>
        </div>
    );
}

ClientTile.defaultProps = {

}

export default ClientTile;

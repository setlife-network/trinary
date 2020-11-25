import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import { spacing, boxShadow, borders } from '@material-ui/system'
import Box from '@material-ui/core/Box'

const ClientTile = ({
    clientName
}) => {

    const redirectClientPage = (client) => {
        console.log(`redirecting to ${client.name}`)
        //TODO: History implementation
    }

    return (
        <div className='ClientTile'>
            <Grid
                container
                justify='center'
                alignItems='center'
                xs={12}
            >
                <Grid item xs={12}>
                    <Box
                        m={2}
                        p={2}
                        boxShadow={3}
                        borderRadius='borderRadius'
                        onClick={() => (redirectClientPage(
                            {
                                name: clientName
                            }
                        ))}
                    >
                        {clientName}
                    </Box>
                </Grid>
            </Grid>

        </div>
    );
}

ClientTile.defaultProps = {

}

export default ClientTile;

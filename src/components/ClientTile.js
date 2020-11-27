import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import { spacing, boxShadow, borders } from '@material-ui/system'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

const ClientTile = ({
    clientName,
    history
}) => {

    const redirectClientPage = (client) => {
        console.log(`redirecting to ${client.name}`)
        //TODO:Add client id to push history
        history.push('/client')
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
                    <Button
                        fullWidth
                        onClick={() => (redirectClientPage(
                            {
                                name: clientName
                            }
                        ))}
                    >
                        <Box
                            width={1}
                            px={10}
                            py={2}
                            boxShadow={3}
                            borderRadius='borderRadius'
                        >
                            {clientName}
                        </Box>
                    </Button>
                </Grid>
            </Grid>

        </div>
    );
}

ClientTile.defaultProps = {

}

export default ClientTile;

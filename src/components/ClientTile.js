import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import { spacing, boxShadow, borders } from '@material-ui/system'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import PersonIcon from '@material-ui/icons/Person';

const ClientTile = ({
    client,
    history
}) => {

    const redirectClientPage = (client) => {
        history.push(`/clients/${client.id}`)
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
                        onClick={() => redirectClientPage({
                            id: client.id
                        })}
                    >
                        <Box
                            width={1}
                            px={10}
                            py={2}
                            boxShadow={3}
                            borderRadius='borderRadius'
                            bgcolor='primary.light'
                        >
                            <Grid
                                container
                                direction='row'
                                alignItems='center'
                                justify='space-between'
                            >
                                <Grid item xs={10}>
                                    {client.name}
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                >
                                    <PersonIcon
                                        color={client.is_active ? 'primary' : 'secondary'}
                                        fontSize='large'
                                    />
                                </Grid>
                            </Grid>
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

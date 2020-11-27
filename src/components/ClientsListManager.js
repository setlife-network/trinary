import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const ClientListManager = () => {
    return (
        <div className='ClientListManager'>
            <Box mb={3} mx={2}>
                <Grid container direction='row' justify='space-between' alignItems='flex-end'>
                    <Grid item>
                        <Box
                            bgcolor='primary.black'
                            color='primary.light'
                            borderRadius='borderRadius'
                            px={5}
                            py={1}
                        >
                            {
                            //TODO: Fetch active clients
                            }
                            X active clients
                        </Box>
                    </Grid>
                    <Grid item>
                        <Fab color='primary' onClick={() => (console.log('Tap'))}>
                            <AddIcon color='secondary'/>
                        </Fab>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default ClientListManager

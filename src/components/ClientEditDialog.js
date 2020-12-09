import React from 'react'
import {
    Box,
    Dialog,
    DialogTitle,
    Grid
} from '@material-ui/core/'

const ClientEditDialog = (props) => {

    const {
        onClose,
        open
    } = props

    return (
        <Dialog onClose={onClose} open={open}>
            <Box mx={5}>
                <DialogTitle>
                    Edit client
                </DialogTitle>
                <Grid container>
                    <Grid item>

                        <p>
                            {`Enter info below to edit this client`}
                        </p>

                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}

export default ClientEditDialog

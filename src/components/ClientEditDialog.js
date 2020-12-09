import React from 'react'
import {
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
            <DialogTitle>
                Edit client
            </DialogTitle>
            <Grid container>
                <Grid item>
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default ClientEditDialog

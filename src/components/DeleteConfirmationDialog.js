import React from 'react'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core/'

const DeleteConfirmationDialog = (props) => {

    const {
        deleteItem,
        onClose,
        open
    } = props

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle>
                {`Delete ${deleteItem}`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    {`Are you sure that you gant to delete this ${deleteItem}`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='primary'>
                    {`Cancel`}
                </Button>
                <Button onClick={onClose} color='primary'>
                    {`Delete`}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteConfirmationDialog

import React from 'react'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core/'

import { red } from '../styles/colors.scss'

const DeleteConfirmationDialog = (props) => {

    const {
        deleteAction,
        deleteItem,
        onClose,
        open
    } = props

    const handleConfirmAction = () => {
        deleteAction()
        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                {`Delete ${deleteItem}`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    {`Are you sure that you want to delete this ${deleteItem}`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='primary'>
                    {`Cancel`}
                </Button>
                <Button onClick={handleConfirmAction}>
                    <Box color={`${red}`}>
                        {`Delete`}
                    </Box>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteConfirmationDialog

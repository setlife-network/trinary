import React from 'react'
import {
    Box,
    Dialog,
    DialogTitle,
    FormControl,
    Grid
} from '@material-ui/core/'

const AllocationAddForm = (props) => {

    const {
        project,
        onClose,
        open
    } = props

    return (
        <Dialog
            onClose={onClose}
            open={open}
            className='AllocationAddForm'
        >
            <Box item>
                <DialogTitle>
                    {`Add Allocation`}
                </DialogTitle>
                <FormControl>
                </FormControl>
            </Box>
        </Dialog>
    )
}

export default AllocationAddForm

import React from 'react'
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core/'

const ClientEditDialog = (props) => {

    const {
        onClose,
        open
    } = props

    return (
        <Dialog onClose={onClose} open={open}>
            <Box mx={5} my={3}>
                <DialogTitle>
                    Edit client
                </DialogTitle>
                <Grid container>
                    <Grid item>
                        <FormControl
                            fullWidth
                            noValidate
                            autoComplete='off'
                            align='left'
                            className='AddClientForm'
                        >
                            <Grid
                                container
                                justify='space-between'
                                alignItems='center'
                            >
                                <Grid item xs={12} lg={5}>
                                    <Box my={2}>
                                        <TextField
                                            label='Client name'
                                            id='clientName'
                                            variant='outlined'
                                            fullWidth
                                            required

                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} lg={5}>
                                    <Box my={2}>
                                        <TextField
                                            label='Email'
                                            id='clientEmail'
                                            variant='outlined'
                                            fullWidth

                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} lg={5}>
                                    <Box width={1} mt={5}>
                                        <Select
                                            name='Currency'
                                            fullWidth

                                        >
                                            <MenuItem value={'USD'}>USD</MenuItem>
                                            <MenuItem value={'MXUSD'}>MXUSD</MenuItem>
                                            <MenuItem value={'EUR'}>EUR</MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            Select currency
                                        </FormHelperText>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box mt={5}>
                                        <Button
                                            variant='contained'
                                            color='primary'

                                        >
                                            Add client
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </FormControl>

                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    )
}

export default ClientEditDialog

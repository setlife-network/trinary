import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
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

import { UPDATE_CLIENT } from '../operations/mutations/ClientMutations'
import { CURRENCIES } from '../constants/'

const ClientEditDialog = (props) => {

    const {
        client,
        onClose,
        open
    } = props

    const [updateClient, { data, loading, error }] = useMutation(UPDATE_CLIENT)

    const [clientName, setClientName] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [clientCurrency, setClientCurrency] = useState('')
    const [disableEdit, setDisableEdit] = useState(true)

    const onEdit = async () => {
        const clientInfoToeEdit = {
            id: client.id,
            email: clientEmail
        }
        if (clientName) {
            clientInfoToeEdit['name'] = clientName
        }
        if (clientCurrency) {
            clientInfoToeEdit['currency'] = clientCurrency
        }
        updateClient({
            variables: clientInfoToeEdit
        })
        onClose()
    }

    const renderCurrencies = (currencies) => {
        return (
            currencies.map(c => {
                return (
                    <MenuItem value={c.name}>
                        {c.name}
                    </MenuItem>
                )
            })
        )
    }

    useEffect(() => {
        if (clientName || clientCurrency || clientEmail) {
            setDisableEdit(false)
        }
    })

    return (
        <Dialog className='ClientEditDialog' onClose={onClose} open={open}>
            <Box mx={5} my={3}>
                <DialogTitle>
                    {`Edit client`}
                </DialogTitle>
                <FormControl>
                    <Grid
                        container
                        justify='space-between'
                        alignItems='center'
                    >
                        <Grid item xs={12} lg={5}>
                            <Box my={2}>
                                <TextField
                                    label='Client name'
                                    variant='outlined'
                                    defaultValue={client.name}
                                    fullWidth
                                    required
                                    onChange={(event) => setClientName(event.target.value)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={5}>
                            <Box my={2}>
                                <TextField
                                    label='Email'
                                    variant='outlined'
                                    defaultValue={client.email}
                                    fullWidth
                                    onChange={(event) => setClientEmail(event.target.value)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={5}>
                            <Box width={1}>
                                <Select
                                    name='Currency'
                                    defaultValue={client.currency}
                                    fullWidth
                                    onChange={(event) => setClientCurrency(event.target.value)}
                                >
                                    {renderCurrencies(CURRENCIES)}
                                </Select>
                                <FormHelperText>
                                    {`Select currency`}
                                </FormHelperText>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>

                            <Box mt={5}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    disabled={disableEdit}
                                    onClick={onEdit}
                                >
                                    {`Edit client`}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </FormControl>
            </Box>
        </Dialog>
    )
}

export default ClientEditDialog

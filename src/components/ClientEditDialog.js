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
    TextField,
    FormGroup,
    Switch
} from '@material-ui/core/'

import { UPDATE_CLIENT } from '../operations/mutations/ClientMutations'
import { CURRENCIES } from '../constants'

const ClientEditDialog = (props) => {

    const {
        client,
        onClose,
        open
    } = props

    const [updateClient, { data, loading, error }] = useMutation(UPDATE_CLIENT)

    const [clientName, setClientName] = useState(client.name)
    const [clientEmail, setClientEmail] = useState(client.email)
    const [clientCurrency, setClientCurrency] = useState(client.currency)
    const [clientIsActive, setClientIsActive] = useState(client.is_active)
    const [disableEdit, setDisableEdit] = useState(true)

    const onEdit = async () => {
        const clientInfoToEdit = {
            id: client.id,
            email: clientEmail
        }
        if (clientName) {
            clientInfoToEdit['name'] = clientName
        }
        if (clientCurrency) {
            clientInfoToEdit['currency'] = clientCurrency
        }
        clientInfoToEdit['is_active'] = clientIsActive

        updateClient({
            variables: clientInfoToEdit
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
        if (clientEmail == '') {
            setClientEmail(null)
        }
        if (!clientName || !clientCurrency) {
            setDisableEdit(true)
        } else if (
            clientName == client.name &&
            clientCurrency == client.currency &&
            clientEmail == client.email &&
            clientIsActive == client.is_active
        ) {
            setDisableEdit(true)
        } else {
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
                        justifyContent='space-between'
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
                            <Box my={2}>
                                <Select
                                    name='Currency'
                                    defaultValue={client.currency}
                                    fullWidth
                                    onChange={(event) => setClientCurrency(event.target.value)}
                                    disabled={client.currencyLocked}
                                >
                                    {renderCurrencies(CURRENCIES)}
                                </Select>
                                <FormHelperText>
                                    {`Select currency`}
                                </FormHelperText>
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={5}>
                            <Box my={2}>
                                <Grid component='label' container alignItems='center' spacing={1}>
                                    <Grid item>Inactive</Grid>
                                    <Grid item>
                                        <Switch
                                            checked={clientIsActive}
                                            onChange={(event) => setClientIsActive(event.target.checked)}
                                            name='checkedA'
                                            color='primary'
                                        />
                                    </Grid>
                                    <Grid item>Active</Grid>
                                </Grid>
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
                                    {`Save client`}
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

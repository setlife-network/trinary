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

    const [updateClient, { data, loading, error }] = useMutation(UPDATE_CLIENT, { errorPolicy: 'all' })

    const [clientName, setClientName] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [clientCurrency, setClientCurrency] = useState('')
    const [disableAdd, setDisableAdd] = useState(true)

    const onEdit = async () => {

        const variables = {
            id: client.id
        }
        if (clientName) {
            variables['name'] = clientName
        }
        if (clientEmail) {
            variables['email'] = clientEmail
        }
        if (clientCurrency) {
            variables['currency'] = clientCurrency
        }

        updateClient({
            variables: variables
        })
        onClose()
    }

    useEffect(() => {
        if (clientName && clientCurrency) {
            setDisableAdd(false)
        }
    })

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
                                            id='clientEmail'
                                            variant='outlined'
                                            defaultValue={client.email}
                                            fullWidth
                                            onChange={(event) => setClientEmail(event.target.value)}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} lg={5}>
                                    <Box width={1} mt={5}>
                                        <Select
                                            name='Currency'
                                            defaultValue={client.currency}
                                            fullWidth
                                            onChange={(event) => setClientCurrency(event.target.value)}
                                        >
                                            {renderCurrencies(CURRENCIES)}
                                        </Select>
                                        <FormHelperText>
                                            Select currency
                                        </FormHelperText>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <pre>
                                        Bad:
                                        {error.graphQLErrors.map(({ message }, i) => (
                                            <span key={i}>{message}</span>
                                        ))}
                                    </pre>
                                    <Box mt={5}>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            onClick={() => (onEdit())}
                                        >
                                            Edit client
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

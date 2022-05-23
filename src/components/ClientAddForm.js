import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import {
    Box,
    Button,
    FormControl,
    Grid,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core/'

import { CREATE_CLIENT } from '../operations/mutations/ClientMutations'
import { CURRENCIES } from '../constants'

const ClientAddForm = ({
    history
}) => {

    const [addClient, { data, loading, error }] = useMutation(CREATE_CLIENT)

    const [clientName, setClientName] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [clientCurrency, setClientCurrency] = useState('')
    const [disableAdd, setDisableAdd] = useState(true)

    const createClient = async () => {
        const newClient = await addClient({
            variables: {
                name: clientName,
                email: clientEmail,
                currency: clientCurrency
            }
        })
        history.push(`/clients/${newClient.data.createClient.id}`)
    }

    const renderCurrencies = (currencies) => {
        return (
            currencies.map((c, i) => {
                return (
                    <MenuItem
                        key={`mi-c-${i}`}
                        value={c.name}
                    >
                        {c.name}
                    </MenuItem>
                )
            })
        )
    }

    useEffect(() => {
        if (!clientName || !clientCurrency) {
            setDisableAdd(true)
        } else {
            setDisableAdd(false)
        }
    })

    return (
        <FormControl
            className='ClientAddForm'
            fullWidth
            align='left'
        >
            <Grid
                container
                justifyContent='space-between'
                alignItems='center'
            >
                <Grid item xs={12} md={5}>
                    <Box my={2}>
                        <TextField
                            label='Client name'
                            id='clientName'
                            variant='outlined'
                            fullWidth
                            required
                            onChange={(event) => setClientName(event.target.value)}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Box my={2}>
                        <TextField
                            label='Email'
                            id='clientEmail'
                            variant='outlined'
                            fullWidth
                            onChange={(event) => setClientEmail(event.target.value)}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Box width={1} mt={5}>
                        <Select
                            name='Currency'
                            fullWidth
                            onChange={(event) => setClientCurrency(event.target.value)}
                            value={clientCurrency}
                        >
                            {renderCurrencies(CURRENCIES)}
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
                            disabled={disableAdd}
                            onClick={createClient}
                        >
                            Add client
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </FormControl>
    )
}

export default ClientAddForm

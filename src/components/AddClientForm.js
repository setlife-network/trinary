import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

import { CREATE_CLIENT } from '../operations/mutations/ClientMutations'

const AddClientForm = ({
    history
}) => {

    const [addClient, { data, loading, error }] = useMutation(CREATE_CLIENT)

    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [clientCurrency, setClientCurrency] = useState('');
    const [disableAdd, setDisableAdd] = useState(true);

    const onAdd = async () => {
        const newClient = await addClient({ variables: { name: clientName, email: clientEmail, currency: clientCurrency } })
        history.push(`/clients/${newClient.data.createClient.id}`)
    }

    useEffect(() => {
        if (clientName && clientCurrency) {
            setDisableAdd(false)
        }
    })

    return (
        <FormControl fullWidth noValidate autoComplete='off' align='left'>
            <Grid
                container
                justify='space-between'
                alignItems='center'
            >

                <Grid item xs={5}>
                    <TextField
                        label='Client name'
                        id='clientName'
                        variant='outlined'
                        fullWidth
                        required
                        onChange={(event) => setClientName(event.target.value)}
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        label='Email'
                        id='clientEmail'
                        variant='outlined'
                        fullWidth
                        onChange={(event) => setClientEmail(event.target.value)}
                    />
                </Grid>
                <Grid item xs={5}>
                    <Box width={1} mt={5}>
                        <Select
                            name='Currency'
                            fullWidth
                            onChange={(event) => setClientCurrency(event.target.value)}
                            value={clientCurrency}
                        >
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'MXUSD'}>MXUSD</MenuItem>
                            <MenuItem value={'EUR'}>EUR</MenuItem>
                        </Select>
                        <FormHelperText>Select currency</FormHelperText>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box mt={5}>
                        <Button
                            variant='contained'
                            color='primary'
                            disabled={disableAdd}
                            onClick={() => (onAdd())}
                        >
                            Add client
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </FormControl>
    )
}

export default AddClientForm

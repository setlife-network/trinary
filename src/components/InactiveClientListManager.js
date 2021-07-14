import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import { useQuery } from '@apollo/client';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import LoadingProgress from './LoadingProgress'
import { GET_INACTIVE_CLIENTS_COUNT } from '../operations/queries/ClientQueries'

const InactiveClientListManager = (props) => {

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked })
    }

    const [state, setState] = React.useState({
        checkedA: false,
    });

    const { loading, error, data } = useQuery(GET_INACTIVE_CLIENTS_COUNT);

    if (loading) return <LoadingProgress/>
    if (error) return `Error! ${error.message}`;
    return (
        <Box
            mb={3}
            mx={1}
            className='ClientListManager'
        >
            {
                data.getInactiveClientsCount != 0
                ? (
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={state.checkedA} onChange={handleChange} name='checkedA' />}
                                label='Show inactive clients'
                            />
                        </FormGroup>
                    ) : ( false )
            }
            <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='flex-end'
            >
                {
                    state.checkedA == true
                        ? (
                            <Grid item xs={8} sm={6} md={4}>
                                <Box
                                    bgcolor='primary.black'
                                    color='primary.light'
                                    borderRadius='borderRadius'
                                    px={2}
                                    px-lg={5}
                                    py={1}
                                >
                                    {
                                        `${data.getInactiveClientsCount} inactive ${data.getInactiveClientsCount == 1
                                            ? 'client'
                                            : 'clients'
                                        }`
                                    }
                                </Box>
                            </Grid>
                        ) : (
                            false
                        )
                }
            </Grid>
        </Box>

    )
}

export default InactiveClientListManager

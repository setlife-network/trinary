import React from 'react'
import { useQuery } from '@apollo/client'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Fab,
    Grid,
    Typography
} from '@material-ui/core/'
import AddIcon from '@material-ui/icons/Add'

import { GET_ALLOCATIONS } from '../operations/queries/AllocationQueries'

const ContributorTile = (props) => {

    const {
        active,
        contributor,
        onAddButton,
        project
    } = props

    const handleAddButton = () => {
        onAddButton({ contributor })
    }

    const {
        data: dataAllocation,
        error: errorAllocation,
        loading: loadingAllocation
    } = useQuery(GET_ALLOCATIONS, {
        variables: {
            projectId: project.id,
            contributorId: contributor.id
        }
    })

    if (loadingAllocation) return ''
    if (errorAllocation) return `An error ocurred ${errorAllocation}`

    console.log('dataAllocation');
    console.log(dataAllocation);

    return (
        <Box
            className='ContributorTile'
            bgcolor={`${active ? 'primary.light_blue' : ''}`}
            borderRadius='borderRadius'
            p={2}
            my={2}
            mx={active ? 1 : 0}
            align='left'
        >
            <Accordion>
                <AccordionSummary>
                    <Grid container>
                        {
                            !active &&
                            <Grid item xs={2}>
                                <Fab
                                    color='primary'
                                    size='small'
                                    onClick={() => handleAddButton()}
                                >
                                    <AddIcon color='action'/>
                                </Fab>
                            </Grid>
                        }
                        <Grid item xs={10}>
                            <Typography>
                                <strong>
                                    {contributor.name}
                                </strong>
                            </Typography>
                            {contributor.github_handle}
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        active &&
                        <>

                        </>
                    }
                </AccordionDetails>
            </Accordion>
        </Box>

    )
}

export default ContributorTile

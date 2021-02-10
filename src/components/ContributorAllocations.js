import React from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'

import AllocationTile from './AllocationTile'
import { GET_CONTRIBUTOR_ALLOCATIONS } from '../operations/queries/ContributorQueries'

const ContributorAllocations = (props) => {

    const {
        contributorId
    } = props

    const {
        data: dataContributorAllocations,
        loading: loadingContributorAllocations,
        error: errorContributorAllocations
    } = useQuery(GET_CONTRIBUTOR_ALLOCATIONS, {
        variables: {
            id: Number(contributorId)
        }
    })

    const renderAllocations = ({ allocations }) => {
        return allocations.map(a => {
            return (
                <Grid item xs={12} md={6} lg={4}>
                    <AllocationTile allocation={a}/>
                </Grid>
            )
        })
    }

    if (loadingContributorAllocations) return 'Loading...'
    if (errorContributorAllocations) return 'Error!'

    const { getContributorById: contributor } = dataContributorAllocations

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box my={5} mx={3}>
                    <Typography variant='h5' color='primary'>
                        <strong>
                            {`Allocations`}
                        </strong>
                    </Typography>
                    <Box my={2}>
                        <Grid container spacing={5}>
                            {renderAllocations({ allocations: contributor.allocations })}
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ContributorAllocations

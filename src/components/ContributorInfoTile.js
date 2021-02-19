import React from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography
} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import accounting from 'accounting-js'
import { last, split } from 'lodash'

import LoadingProgress from './LoadingProgress'
import { GET_CONTRIBUTOR_INFO } from '../operations/queries/ContributorQueries'
import {
    formatAmount,
    selectCurrencyInformation
} from '../scripts/selectors'

const ContributorInfoTile = (props) => {

    const {
        contributorId
    } = props

    const {
        data: dataContributor,
        error: errorContributor,
        loading: loadingContributor
    } = useQuery(GET_CONTRIBUTOR_INFO, {
        variables: {
            id: Number(contributorId)
        }
    })

    if (loadingContributor) return <LoadingProgress/>
    if (errorContributor) return ''

    const { getContributorById: contributor } = dataContributor

    const githubUser = last(split(contributor.github_handle, '/'))
    const currencyInformation = selectCurrencyInformation({
        currency: 'USD'
    })
    const paymentAmount = formatAmount({
        amount: contributor.total_paid / 100,
        currencyInformation: currencyInformation
    })

    return (
        <Card variant='outlined' className='ContributorInfoTile'>
            <CardContent>
                <Box m={4} align='left'>
                    <Grid container spacing={1}>
                        <Grid item xs={10}>
                            <Typography variant='h5' color='primary'>
                                <strong>
                                    {`${contributor.name}`}
                                </strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <CheckCircleIcon
                                color='primary'
                                fontSize='large'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                {`${githubUser}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
            <CardActions>
                <Box
                    mx={3}
                    mb={2}
                    px={2}
                    py={1}
                    align='left'
                    bgcolor='primary.light_blue'
                    borderRadius='borderRadius'
                >
                    <Typography>
                        {`Total paid from allocations: ${paymentAmount}`}
                    </Typography>
                </Box>
            </CardActions>
        </Card>
    )
}

export default ContributorInfoTile

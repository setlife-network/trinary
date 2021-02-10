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
import { split } from 'lodash'

import { GET_CONTRIBUTOR_INFO } from '../operations/queries/ContributorQueries'
import { selectCurrencyInformation } from '../scripts/selectors'

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

    if (loadingContributor) return 'Loading...'
    if (errorContributor) return ''

    const { getContributorById: contributor } = dataContributor
    const githubHandleDivided = split(contributor.github_handle, '/')
    const githubUser = githubHandleDivided[githubHandleDivided.length - 1]
    const currencyInformation = selectCurrencyInformation({
        currency: 'USD'
    })
    //TODO: Replacethe following function with upcoming selecto formatAmount (currently on different pr)
    const formatPaymentAmount = (props) => {
        const { amount, currencyInformation } = props
        return accounting.formatMoney(
            amount,
            {
                symbol: currencyInformation['symbol'],
                thousand: currencyInformation['thousand'],
                decimal: currencyInformation['decimal'],
                format: '%s %v'
            }
        )
    }
    const paymentAmount = formatPaymentAmount({
        amount: contributor.total_paid / 100,
        currencyInformation: currencyInformation
    })
    console.log('contributor');
    console.log(contributor);

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

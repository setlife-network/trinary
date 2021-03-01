import React from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Grid,
    Icon,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
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
        amount: contributor.totalPaid / 100,
        currencyInformation: currencyInformation
    })

    const renderPaidToContributorByCurrency = (props) => {
        const {
            paidByCurrency
        } = props

        return paidByCurrency.map(p => {
            const currencyInformation = selectCurrencyInformation({
                currency: p.currency
            })
            const paymentAmount = formatAmount({
                amount: p.amount / 100,
                currencyInformation: currencyInformation
            })
            return (
                <ListItem>
                    <ListItemAvatar>
                        <Icon className='fas fa-money-bill-wave' color='primary'/>
                    </ListItemAvatar>
                    <ListItemText primary={`${paymentAmount}`}/>
                </ListItem>
            )
        })
    }

    return (
        <Card variant='outlined' className='ContributorInfoTile'>
            <CardContent>
                <Box m={4} align='left'>
                    <Grid container>
                        <Grid item xs={10}>
                            <Typography variant='h5' color='primary'>
                                <strong>
                                    {`${contributor.name}`}
                                </strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Icon className='fas fa-check-circle' color='primary' fontSize='large'/>
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
                <Grid container>
                    <Grid item xs={12}>
                        <Box
                            mx={3}
                            px={2}
                            mb={2}
                            pt={1}
                            align='left'
                            bgcolor='primary.light_blue'
                            borderRadius='borderRadius'
                        >
                            <Typography>
                                <strong>
                                    {`Total paid from allocations:`}
                                </strong>
                            </Typography>
                            <List>
                                {renderPaidToContributorByCurrency({ paidByCurrency: contributor.paidByCurrency })}
                            </List>
                        </Box>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

export default ContributorInfoTile

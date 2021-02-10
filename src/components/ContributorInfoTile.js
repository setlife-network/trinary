import React from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography
} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { split } from 'lodash'

import { GET_CONTRIBUTOR_INFO } from '../operations/queries/ContributorQueries'

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
    console.log('contributor');
    console.log(contributor);

    return (
        <Card variant='outlined' className='ContributorInfoTile'>
            <CardContent>
                <Box m={5} align='left'>
                    <Grid container spacing={2}>
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
        </Card>
    )
}

export default ContributorInfoTile

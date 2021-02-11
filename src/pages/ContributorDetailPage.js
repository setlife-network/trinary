import React from 'react'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'

import ContributorAllocations from '../components/ContributorAllocations'
import ContributorInfoTile from '../components/ContributorInfoTile'
import ContributorProjectsCollab from '../components/ContributorProjectsCollab'
import Header from '../components/Header'

class ContributorDetailPage extends React.Component {

    render() {

        const { contributorId } = this.props.match.params

        return (
            <Grid
                conatiner
                justify='center'
                align='center'
                className='ContributorDetailPage'
            >
                <Header
                    title='Contributor'
                    direction='row'
                    justify='center'
                    alignItems='center'
                />
                <Grid item xs={10} sm={7} md={6} lg={3}>
                    <ContributorInfoTile
                        contributorId={contributorId}
                    />
                </Grid>
                <Grid item xs={10}>
                    <Box my={3}>
                        <hr/>
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <Box
                        p={1}
                        bgcolor='white'
                        borderRadius='borderRadius'
                        mb={5}
                    >
                        <Grid container>
                            <Grid item xs={12}>
                                <ContributorProjectsCollab
                                    contributorId={contributorId}
                                />
                            </Grid>
                            <Grid item xs={11}>
                                <hr/>
                            </Grid>
                            <Grid item xs={12} align='left'>
                                <ContributorAllocations
                                    contributorId={contributorId}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        )
    }
}

export default ContributorDetailPage

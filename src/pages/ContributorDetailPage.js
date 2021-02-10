import React from 'react'
import {
    Grid
} from '@material-ui/core'

import ContributorInfoTile from '../components/ContributorInfoTile'
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
            </Grid>
        )
    }
}

export default ContributorDetailPage

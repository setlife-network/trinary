import React from 'react'
import {
    Grid
} from '@material-ui/core'
import ContributorTile from './ContributorTile'

const UpcomingContributors = (props) => {

    const {
        contributors,
        active,
        project,
        addAllocation
    } = props

    return (
        contributors.map(c => {
            return (
                <Grid item xs={12} md={6}>
                    <ContributorTile 
                        active={active}
                        contributor={c}
                        onAddButton={addAllocation}
                        project={project}  
                    />
                </Grid>
            )
        })
    )
}

export default UpcomingContributors
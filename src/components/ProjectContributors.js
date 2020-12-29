import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Grid
} from '@material-ui/core/'

import { GET_PROJECT } from '../operations/queries/ProjectQueries'

// Convert to imported component as ContributorTile.js when ready to merge
const ContributorTile = (props) => {
    const { contributor } = props

    // Log the `contributor` object to confirm its data structure

    return (
        <div className='ContributorTile'>
            ContributorTile
        </div>
    )

}

const ProjectContributors = (props) => {

    const { projectId } = props
    const { loading, error, data, networkStatus } = useQuery(GET_PROJECT, {
        variables: {
            id: Number(projectId)
        }
    })

    if (loading) {
        return (
            <Grid item xs={12}>
                Loading...
            </Grid>
        )
    }
    if (error) return `Error! ${error.message}`

    const project = data.getProjectById

    const { contributors } = project

    console.log('contributors');
    console.log(contributors);

    // const renderContributors = () => {
    //     // TODO:
    //     // fetch contributors from API
    //     // store them in state
    //     // replace the mocked array
    //
    //     return MOCKED_CONTRIBUTORS.map(c => {
    //         return (
    //             <ContributorTile
    //                 contributor={c}
    //             />
    //         )
    //     })
    // }

    return (
        <Grid container className='ProjectContributors'>

            <h1>Trinary Contributors</h1>
            <Grid item xs={12} md={3}>
                <Box
                    bgcolor='primary.black'
                    color='primary.light'
                    borderRadius='borderRadius'
                    px={5}
                    py={1}
                >
                    {
                        `${contributors.length} active ${contributors.length == 1
                            ? 'contributor'
                            : 'contributors'
                        }`
                    }
                </Box>
            </Grid>
        </Grid>
    );
}

export default ProjectContributors

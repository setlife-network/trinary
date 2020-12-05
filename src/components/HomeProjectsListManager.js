import React from 'react'
import { gql, useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid'
import { orderBy } from 'lodash'

import { GET_POJECTS } from '../operations/queries/ProjectQueries'
import ProjectsList from './ProjectsList'

const HomeProjectsListManager = ({
    history
}) => {

    const { loading, error, data } = useQuery(GET_POJECTS);

    if (loading) {
        return (
            <Grid item xs={12}>
                Loading...
            </Grid>
        )
    }
    if (error) return `Error! ${error.message}`;
    const projects = orderBy(data.getProjects, ['is_active'], ['desc'])

    return (
        <ProjectsList
            history={history}
            projects={projects}
        />
    )
}

export default HomeProjectsListManager

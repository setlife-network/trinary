import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core'
import { orderBy } from 'lodash'

import LoadingProgress from './LoadingProgress'
import ProjectsList from './ProjectsList'
import { GET_ALL_PROJECTS } from '../operations/queries/ProjectQueries'

const HomeProjects = ({
    history
}) => {

    const { loading, error, data } = useQuery(GET_ALL_PROJECTS, {
        fetchPolicy: 'cache-and-network'
    });

    if (loading) return <LoadingProgress/>
    if (error) return `Error! ${error.message}`;
    const projects = orderBy(data.getProjects, ['is_active'], ['desc'])

    return (
        <>
            {
                projects.length != 0
                    ? (
                        <ProjectsList
                            history={history}
                        />
                    ) : (
                        <>
                            {
                                //TODO: Empty State
                            }
                        </>
                    )
            }
        </>
    )
}

export default HomeProjects

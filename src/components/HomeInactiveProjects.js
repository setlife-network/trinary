import React from 'react'
import { useQuery } from '@apollo/client';
import { orderBy } from 'lodash'

import LoadingProgress from './LoadingProgress'
import ProjectsList from './ProjectsList'
import { GET_INACTIVE_PROJECTS } from '../operations/queries/ProjectQueries'

const HomeInactiveProjects = ({
    history
}) => {

    const { loading, error, data } = useQuery(GET_INACTIVE_PROJECTS, {
        fetchPolicy: 'cache-and-network'
    });

    if (loading) return <LoadingProgress/>
    if (error) return `Error! ${error.message}`;
    const projects = orderBy(data.getInactiveProjects, ['name'])

    return (
        <>
            {
                projects.length != 0
                    ? (
                        <ProjectsList
                            history={history}
                            projects={projects}
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

export default HomeInactiveProjects

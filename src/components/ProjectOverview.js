import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

import { GET_PROJECT } from '../operations/queries/ProjectQueries'

const MOCKED_PROJECT = {
    id: 1,
    name: 'Project Trinary',
    expected_budget: 1000000,
    github_url: 'https://github.com/setlife-network/project-trinary',
    toggl_url: 'https://track.toggl.com/3070291/projects/162053371/team',
    toggl_id: `162053371`,
    client: {
        id: 1,
        name: 'SetLife'
    },
    totalPaid: 500000,
    totalTimeSpent: 100000,
    timeSpent: [
        {
            contributor: {
                name: 'Oscar'
            },
            seconds: 360000
        },
        {
            contributor: {
                name: 'Sofia'
            },
            seconds: 10000
        },
        {
            contributor: {
                name: 'David'
            },
            seconds: 54321
        },
        {
            contributor: {
                name: 'Victor'
            },
            seconds: 12345
        }
    ]
}

const ProjectSummary = (props) => {
    return (
        <div className='ProjectSummary'>
            ProjectSummary
        </div>
    )
}

const TimeTracking = ({
    totalTimeSpent,
    timeSpent
}) => {
    return (
        <div className='TimeTracking'>
            TimeTracking
        </div>
    )
}

const ProjectOverview = (props) => {
    const { data, loading, error } = useQuery(GET_PROJECT, {
        variables: {
            id: 4
            // id: Number(projectId)
        }
    })

    if (loading) return 'Loading...'
    if (error) return error

    const project = data?.getProjectById
    return (
        <div className='ProjectOverview'>
            ProjectOverview
            {/* <ProjectSummary project={project}/>
            <TimeTracking project={project}/> */}
        </div>
    );
}

ProjectOverview.defaultProps = {

};

export default ProjectOverview;

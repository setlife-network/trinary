import React, { useState } from 'react';

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
    console.log(MOCKED_PROJECT)

    return (
        <div className='ProjectOverview'>
            ProjectOverview
            <ProjectSummary project={MOCKED_PROJECT}/>
            <TimeTracking project={MOCKED_PROJECT}/>
        </div>
    );
}

ProjectOverview.defaultProps = {
    
};

export default ProjectOverview;

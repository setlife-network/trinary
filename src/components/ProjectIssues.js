import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import {
    Grid
} from '@material-ui/core'

import ProjectIssuesMetrics from './ProjectIssuesMetrics'
import { GET_PROJECT_ISSUES } from '../operations/queries/IssueQueries'
// Convert to imported component as IssueTile.js when ready to merge
const IssueTile = (props) => {
    const { issue } = props

    // Log the `issue` object to confirm its data structure

    return (
        <div className='IssueTile'>
            IssueTile
        </div>
    )

}

const ProjectIssues = (props) => {

    // const renderIssues = () => {
    //     // TODO:
    //     // fetch issues from API
    //     // store them in state
    //     // replace the mocked array
    //
    //     return MOCKED_ISSUES.map(i => {
    //         return (
    //             <IssueTile
    //                 issue={i}
    //             />
    //         )
    //     })
    // }

    const { projectId } = props

    const { loading, error, data } = useQuery(GET_PROJECT_ISSUES, {
        variables: { projectId: Number(projectId) }
    })

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    if (error) return `Error! ${error.message}`

    console.log('data');
    console.log(data);

    const { getIssuesByProjectId: projectIssues } = data

    return (
        <Grid container className='ProjectIssues'>
            <h1>Issues</h1>
            <Grid item xs={12}>
                <ProjectIssuesMetrics githubURL={projectIssues.github_url} issues={projectIssues}/>
            </Grid>
        </Grid>
    )
}

export default ProjectIssues

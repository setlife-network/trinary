import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Grid
} from '@material-ui/core'
import moment from 'moment'

import IssueTile from './IssueTile'
import ProjectIssuesMetrics from './ProjectIssuesMetrics'
import { GET_PROJECT } from '../operations/queries/ProjectQueries'

const ProjectIssues = (props) => {

    const { projectId } = props
    const todayAMonthAgo = moment(moment().subtract(30, 'days')).format('YYYY-MM-DD')

    const renderIssues = (issues) => {
        return issues.map(i => {
            return (
                <Grid item xs={12}>
                    <IssueTile issue={i}/>
                </Grid>
            )
        })
    }

    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: {
            id: Number(projectId),
            issuesFromDate: todayAMonthAgo
        }
    })

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    if (error) return `Error! ${error.message}`

    const { getProjectById: project } = data

    return (
        <Grid container className='ProjectIssues'>
            <h1>Issues</h1>
            <Grid item xs={12}>
                <ProjectIssuesMetrics
                    githubURL={project.github_url}
                    openedIssues={project.githubIssuesOpened}
                    closedIssues={project.githubIssuesClosed}
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    {renderIssues(project.issues)}
                </Grid>
                <Box my={5}>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ProjectIssues

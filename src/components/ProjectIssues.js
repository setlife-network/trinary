import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Grid
} from '@material-ui/core'
import moment from 'moment'
import { orderBy } from 'lodash'

import IssueTile from './IssueTile'
import ProjectIssuesMetrics from './ProjectIssuesMetrics'
import { GET_PROJECT } from '../operations/queries/ProjectQueries'

const ProjectIssues = (props) => {

    const { projectId } = props
    const last30DayIssues = []
    const today30DaysAgo = moment().subtract(30, 'days').format('x')

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
            id: Number(projectId)
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

    project.issues.map(i => {
        if (i['date_opened'] >= today30DaysAgo) {
            last30DayIssues.push(i)
        }
    })
    const sortedIssues = orderBy(last30DayIssues, ['date_closed'], ['desc'])

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
                    {renderIssues(sortedIssues)}
                </Grid>
                <Box my={5}>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ProjectIssues

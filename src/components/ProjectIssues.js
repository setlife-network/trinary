import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Grid
} from '@material-ui/core'
import moment from 'moment'
import { orderBy } from 'lodash'

import GithubAccessBlocked from './GithubAccessBlocked'
import IssueTile from './IssueTile'
import LoadingProgress from './LoadingProgress'
import ProjectIssuesMetrics from './ProjectIssuesMetrics'

import { GET_PROJECT_ISSUES } from '../operations/queries/ProjectQueries'
import { pageName } from '../reactivities/variables'

const ProjectIssues = (props) => {

    const { projectId } = props
    const last30DayIssues = []
    const today30DaysAgo = moment().subtract(30, 'days').format('x')

    const {
        data: dataProjectIssues,
        loading: loadingProjectIssues,
        error: errorProjectIssues
    } = useQuery(GET_PROJECT_ISSUES, {
        variables: {
            id: Number(projectId)
        }
    })

    const renderIssues = (issues) => {
        return issues.map(i => {
            return (
                <Grid item xs={12}>
                    <IssueTile issue={i}/>
                </Grid>
            )
        })
    }

    if (loadingProjectIssues) return <LoadingProgress/>
    if (errorProjectIssues) {
        return (
            <GithubAccessBlocked
                message={`You must be a Github collaborator to access this metrics`}
            />
        )
    }

    const { getProjectById: project } = dataProjectIssues
    pageName(project.name)
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

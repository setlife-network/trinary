import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {
    Box,
    Button,
    Grid
} from '@material-ui/core'
import moment from 'moment'
import { orderBy } from 'lodash'

import GithubAccessBlocked from './GithubAccessBlocked'
import IssueTile from './IssueTile'
import LoadingProgress from './LoadingProgress'
import ProjectIssuesMetrics from './ProjectIssuesMetrics'

import { GET_PROJECT_ISSUES } from '../operations/queries/ProjectQueries'
import { SYNC_GITHUB_ISSUES } from '../operations/mutations/ProjectMutations'
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

    const [
        getIssues,
        {
            data: dataIssues,
            loading: loadingIssues,
            error: errorIssues
        }
    ] = useMutation(SYNC_GITHUB_ISSUES, {
        variables: {
            project_id: Number(projectId)
        },
        refetchQueries: [
            {
                query: GET_PROJECT_ISSUES,
                variables: {
                    id: Number(projectId)
                }
            }
        ]
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
                message={`You must have access to this repository on GitHub to access these metrics.`}
                projectId={projectId}
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
            <h1>{`Issues`}</h1>
            <Grid item xs={12}>
                <ProjectIssuesMetrics
                    githubURL={project.github_url}
                    openedIssues={project.githubIssuesOpened}
                    closedIssues={project.githubIssuesClosed}
                    openPullRequests={project.githubPullRequestsOpened}
                    closedPullRequests={project.githubPullRequestsClosed}
                    mergedPullRequests={project.githubPullRequestsMerged}
                />
            </Grid>
            <Grid item xs={6} sm={4} align='left'>
                <Box mt={3}>
                    <Button
                        variant='outlined'
                        color='primary'
                        onClick={() => getIssues()}
                    >
                        {`Sync last 30 days issues`}
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                {loadingIssues &&
                    <LoadingProgress/>
                }
                <Grid container>
                    {renderIssues(sortedIssues)}
                </Grid>
                <Box my={[2, 5]}/>
            </Grid>
        </Grid>
    )
}

export default ProjectIssues

import React from 'react'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const ProjectIssuesMetrics = (props) => {

    const {
        githubURL,
        openedIssues,
        closedIssues,
        openPullRequests,
        closedPullRequests
    } = props

    return (
        <Box
            className='ProjectIssuesMetrics'
            bgcolor='primary.light_blue'
            align='left'
            borderRadius='borderRadius'
            p={3}
            boxShadow={3}
        >
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Box my={2}>
                        <Typography color='primary' variant='h5'>
                            <strong>
                                {`Issues`}
                            </strong>
                        </Typography>
                        <Typography>
                            <strong>
                                {`${openedIssues} active ${openedIssues == 1 ? 'issue' : 'issues'}`}
                                <br/>
                                {`${closedIssues} closed ${closedIssues == 1 ? 'issue' : 'issues'}`}
                            </strong>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item sm={6}>
                    <Box my={2}>
                        <Typography color='primary' variant='h5'>
                            <strong>
                                {`Pull Requests`}
                            </strong>
                        </Typography>
                        <Typography>
                            <strong>
                                {`${openPullRequests} open pull ${openPullRequests == 1 ? 'request' : 'requests'}`}
                                <br/>
                                {`${closedPullRequests} closed pull ${closedPullRequests == 1 ? 'request' : 'requests'}`}
                            </strong>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Box mt={2}>
                <a
                    href={`${githubURL}/issues`}
                    target='_blank'
                    rel='noreferrer'
                >
                    <Grid container>
                        <Grid item>
                            <Typography color='primary'>
                                <strong>
                                    Go to issues on Github
                                </strong>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography color='primary'>
                                <ArrowForwardIcon/>
                            </Typography>
                        </Grid>
                    </Grid>
                </a>
            </Box>
        </Box>
    )
}

export default ProjectIssuesMetrics

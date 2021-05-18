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
                    <Box mb={2}>
                        <Typography color='primary' variant='h5'>
                            <strong>
                                {`Issues`}
                            </strong>
                        </Typography>
                        <Typography>
                            <strong>
                                {`${openedIssues} active`}
                                <br/>
                                {`${closedIssues} closed`}
                            </strong>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item sm={6}>
                    <Box mb={2}>
                        <Typography color='primary' variant='h5'>
                            <strong>
                                {`Pull Requests`}
                            </strong>
                        </Typography>
                        <Typography>
                            <strong>
                                {`${openPullRequests} open`}
                                <br/>
                                {`${closedPullRequests} closed`}
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
                                    {`GitHub`}
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

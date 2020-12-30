import React from 'react'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const ProjectIssuesMetrics = (props) => {

    const {
        githubURL,
        openedIssues,
        closedIssues
    } = props

    return (
        <Box
            className='ProjectIssuesMetrics'
            bgcolor='primary.light_blue'
            align='left'
            borderRadius='borderRadius'
            p={3}
        >
            <Typography>
                <strong>
                    {`${openedIssues} active ${openedIssues == 1 ? 'issue' : 'issues'}`}
                </strong>
            </Typography>
            <Typography>
                <strong>
                    {`${closedIssues} closed ${closedIssues == 1 ? 'issue' : 'issues'}`}
                </strong>
            </Typography>
            <Box mt={2}>
                <Grid container>
                    <Grid item>
                        <a
                            href={`${githubURL}/issues`}
                            target='_blank'
                            rel='noreferrer'
                        >
                            <Typography color='primary'>
                                <strong>
                                    Go to issues on Github
                                </strong>
                            </Typography>
                        </a>
                    </Grid>
                    <Grid item>
                        <Typography color='primary'>
                            <ArrowForwardIcon/>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default ProjectIssuesMetrics

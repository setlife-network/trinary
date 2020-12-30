import React from 'react'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'
import {
    filter
} from 'lodash'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const ProjectIssuesMetrics = (props) => {

    const { githubURL, issues } = props

    console.log('githubURL');
    console.log(githubURL);

    const activeIssues = filter(issues, { 'date_closed': null })
    const closedIssues = filter(issues, 'date_closed')

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
                    {`${activeIssues.length} active ${activeIssues.lengt == 1 ? 'issue' : 'issues'}`}
                </strong>
            </Typography>
            <Typography>
                <strong>
                    {`${closedIssues.length} closed ${closedIssues.lengt == 1 ? 'issue' : 'issues'}`}
                </strong>
            </Typography>
            <Box mt={2}>
                <Grid container>
                    <Grid item>
                        <a href={`${githubURL}/issues`}>
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

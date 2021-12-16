import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core'
import { orderBy } from 'lodash'

import ProjectTile from './ProjectTile'
import LoadingProgress from './LoadingProgress'
import { GET_INACTIVE_PROJECTS, GET_INACTIVE_PROJECTS_COUNT } from '../operations/queries/ProjectQueries';
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Box from '@material-ui/core/Box'

const InactiveProjectsList = (props) => {
    const history = useHistory()
    const {
        loading: loadingInactiveProject,
        error: errorInactiveProject,
        data: dataInactiveProject
    } = useQuery(GET_INACTIVE_PROJECTS, {
        fetchPolicy: 'cache-and-network'
    });

    const [showInactiveProjects, setshowInactiveProjects] = useState(false)

    const {
        loading: loadingInactiveProjectsCount,
        error: errorInactiveProjectsCount,
        data: dataInactiveProjectsCount
    } = useQuery(GET_INACTIVE_PROJECTS_COUNT);

    if (loadingInactiveProjectsCount) return <LoadingProgress/>
    if (errorInactiveProjectsCount) return `Error! ${errorInactiveProjectsCount.message}`;

    const renderProjectTiles = (projects) => {
        return projects.map(p => {
            return (
                <Grid item xs={12} sm={6} lg={4}>
                    <ProjectTile
                        project={p}
                        history={history}
                    />
                </Grid>
            )
        })
    }

    if (loadingInactiveProject) return <LoadingProgress/>
    if (errorInactiveProject) return `Error! ${errorInactiveProject.message}`;
    const projects = orderBy(dataInactiveProject.getInactiveProjects, 'is_active', 'desc')

    return (
        <>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={showInactiveProjects}
                            onChange={(event) => setshowInactiveProjects(event.target.checked)}
                            name='showInactiveProjects'
                            color='primary'
                        />
                    }
                    label='Show inactive projects'
                />
            </FormGroup>
            <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='flex-end'
            >
                {
                    showInactiveProjects == true
                        ? (
                            <Grid item xs={12} sm={6} md={4}>
                                <Box
                                    bgcolor='primary.black'
                                    color='primary.light'
                                    borderRadius='borderRadius'
                                    px={2}
                                    px-lg={5}
                                    py={1}
                                >
                                    {
                                        `${dataInactiveProjectsCount.getInactiveProjectsCount} inactive ${dataInactiveProjectsCount.getInactiveProjectsCount == 1
                                            ? 'project'
                                            : 'projects'
                                        }`
                                    }
                                </Box>
                            </Grid>
                        ) : null
                }
                <Grid container>
                    {
                        showInactiveProjects
                            ? projects.length != 0
                                ? renderProjectTiles(projects)
                                : null
                            : null
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default InactiveProjectsList

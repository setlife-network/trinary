import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Button,
    Collapse,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@material-ui/core/'
import {
    ExpandLess,
    ExpandMore
} from '@material-ui/icons'
import AssessmentIcon from '@material-ui/icons/Assessment'
import GitHubIcon from '@material-ui/icons/GitHub'
import PaymentIcon from '@material-ui/icons/Payment'
import PeopleIcon from '@material-ui/icons/Group'
import moment from 'moment'
import {
    difference,
    differenceBy,
    differenceWith,
    isEqual,
    last,
    split
} from 'lodash'
import accounting from 'accounting-js'

import { GET_ALL_PROJECTS } from '../operations/queries/ProjectQueries'
import { selectCurrencyInformation, selectCurrencySymbol } from '../scripts/selectors'

const AllocationProposeSpecifics = (props) => {

    const {
        contributor
    } = props

    const {
        data: dataProjects,
        error: errorProjects,
        loading: loadingProjects
    } = useQuery(GET_ALL_PROJECTS)

    const [selectedProject, setSelectedProject] = useState(null)
    const [openProjectsList, setOpenProjectsList] = useState(false)

    const handleClickProjectsList = () => {
        setOpenProjectsList(!openProjectsList)
    }
    const onClickProject = ({ project }) => {
        setSelectedProject(project)
        setOpenProjectsList(false)
    }

    const listProjects = ({ projects, selectedProject }) => {
        const unselectedProjects = differenceBy(projects, selectedProject, 'id')
        return unselectedProjects.map(project => {
            return (
                <List component='div' disablePadding>
                    <ListItem button onClick={() => onClickProject({ project })}>
                        <Grid container>
                            <Grid item xs={3}/>
                            <Grid item xs={3}>
                                <ListItemText primary={`${project.name}`}/>
                            </Grid>
                            <Grid item xs={3} align='center'>
                                <Typography variant='caption' color='secondary'>
                                    {`${last(split(project.client.name, '/'))}`}
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
            )
        })
    }

    if (loadingProjects) return ''
    if (errorProjects) return 'Error!'

    const { getProjects: projects } = dataProjects

    return (
        <Box className='AllocationProposeSpecifics'>
            <Grid container justify='center'>
                <Grid item xs={12}>
                    <List component='nav'>
                        <ListItem>
                            <Grid container>
                                <Grid item xs={3}>
                                    <PeopleIcon color='primary'/>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>
                                        {`${contributor.name}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} align='center'>
                                    <Typography variant='caption' color='secondary'>
                                        {`${last(split(contributor.github_handle, '/'))}`}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12}>
                    <List component='nav'>
                        <ListItem button onClick={handleClickProjectsList}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <AssessmentIcon color='primary'/>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>
                                        {selectedProject ? selectedProject.name : 'No selected'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} align='center'>
                                    <Typography variant='caption' color='secondary'>
                                        {`${selectedProject
                                            ? last(split(selectedProject.client.name, '/'))
                                            : ''
                                        }`}
                                    </Typography>
                                </Grid>

                                <Grid item xs={3} align='right'>
                                    {openProjectsList
                                        ? <ExpandLess />
                                        : <ExpandMore />
                                    }
                                </Grid>

                            </Grid>
                        </ListItem>
                        <Collapse in={openProjectsList} timeout='auto' unmountOnExit>
                            {listProjects({
                                projects,
                                selectedProject: [selectedProject]
                            })}
                        </Collapse>
                    </List>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AllocationProposeSpecifics

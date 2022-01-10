import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {
    BottomNavigation,
    BottomNavigationAction,
    Grid
} from '@material-ui/core'
import AssessmentIcon from '@material-ui/icons/Assessment'
import PeopleIcon from '@material-ui/icons/People'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'

import ProjectOverview from '../components/ProjectOverview'
import ProjectPayments from '../components/ProjectPayments'
import ProjectContributors from '../components/ProjectContributors'
import ProjectIssues from '../components/ProjectIssues'

class ProjectDetailPage extends React.Component {

    handleTabClick = (event, tab) => {
        this.props.history.push(`/projects/${this.props.match.params.projectId}/${tab}`)
    }

    render() {
        const {
            history,
            location,
            match
        } = this.props
        // Convert URL `/projects/1/payments` to `payments`
        const selectedTab = location.pathname.replace(match.url, '').slice(1)

        return (
            <Grid container justify='center' className='ProjectDetailPage'>
                <Grid 
                    item 
                    xs={10} 
                    md={6} 
                    className='GridProjectDetailPage'
                >
                    <Route
                        exact
                        path={`${match.url}/`}
                        component={() => <Redirect to={`${match.url}/overview`} />}
                    />
                    <Route
                        path={`${match.url}/overview`}
                        render={(props) => <ProjectOverview {...props} projectId={this.props.match.params.projectId}/>}
                    />
                    <Route
                        path={`${match.url}/payments`}
                        render={(props) => <ProjectPayments {...props} projectId={this.props.match.params.projectId}/>}
                    />
                    <Route
                        path={`${match.url}/contributors`}
                        render={(props) => <ProjectContributors {...props} projectId={this.props.match.params.projectId}/>}
                    />
                    <Route
                        path={`${match.url}/issues`}
                        render={(props) => <ProjectIssues {...props} projectId={this.props.match.params.projectId}/>}
                    />
                </Grid>
                <BottomNavigation
                    value={selectedTab}
                    onChange={this.handleTabClick}
                >
                    <BottomNavigationAction
                        label='Overview'
                        value='overview'
                        icon={<AssessmentIcon/>}
                    />
                    <BottomNavigationAction
                        label='Payments'
                        value='payments'
                        icon={<AttachMoneyIcon/>}
                    />
                    <BottomNavigationAction
                        label='Contributors'
                        value='contributors'
                        icon={<PeopleIcon/>}
                    />
                    <BottomNavigationAction
                        label='Issues'
                        value='issues'
                        icon={<FormatListNumberedIcon/>}
                    />
                </BottomNavigation>
            </Grid>
        )
    }
}

export default ProjectDetailPage

import React from 'react'
import {
    Grid
} from '@material-ui/core'

import Logout from '../components/Logout'
import { pageName } from '../reactivities/variables'

class SettingsPage extends React.Component {

    render() {
        
        pageName('Settings')

        return (
            <Grid container className='Settings'>
                <Grid xs={12}>
                    <Logout/>
                </Grid>
            </Grid>
        )
    }
}

export default SettingsPage

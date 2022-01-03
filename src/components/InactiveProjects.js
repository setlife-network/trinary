import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'

import InactiveProjectListManager from './InactiveProjectListManager';
import HomeInactiveProjects from './HomeInactiveProjects';
import ClientInactiveProjectLists from './ClientInactiveProjectsList';

const InactiveProjects = ({
    history,
    home,
    clientId
}) => {

    const [showInactiveProjects, setShowInactiveProjects] = useState(false)

    return (
        <>
            <InactiveProjectListManager
                clientId={clientId}
                showInactiveProjects={showInactiveProjects}
                setShowInactiveProjects={setShowInactiveProjects}
            />
            {showInactiveProjects && (
                home
                    ? (
                        <Grid container>
                            <HomeInactiveProjects
                                history={history}
                            />
                        </Grid>
                    ) : (
                        <Grid container>
                            <ClientInactiveProjectLists
                                clientId={clientId}
                                history={history}
                            />
                        </Grid>
                    )
            )}
        </>
    )
}

export default InactiveProjects

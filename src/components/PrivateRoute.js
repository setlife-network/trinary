import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useReactiveVar, useQuery } from '@apollo/client'

import { authUser } from '../reactivities/variables'
import { CHECK_SESSION } from '../operations/queries/ContributorQueries'

const PrivateRoute = (props) => {

    const { error, loading, data } = useQuery(CHECK_SESSION)

    if (loading) {
        return (
            <>
            </>
        )
    }

    if (error) return `Error! ${error.message}`

    //const isLoggedIn = useReactiveVar(authUser)

    const isLoggedIn = data.checkSession ? true : false

    const { component: Component, ...rest } = props

    return (
        <Route
            {...rest}
            render={(props) => (
                isLoggedIn
                    ? <Component {...props}/>
                    : <Redirect to='/login'/>
            )}
        >
        </Route>
    )
}

export default PrivateRoute

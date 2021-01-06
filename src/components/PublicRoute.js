import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useReactiveVar } from '@apollo/client'

import { authUser } from '../reactivities/variables'

const PublicRoute = (props) => {

    const isLoggedIn = useReactiveVar(authUser)

    const { component: Component, restricted, ...rest } = props
    return (
        <Route
            {...rest}
            render={(props) => (
                isLoggedIn && restricted
                    ? <Redirect to='/'/>
                    : <Component {...props} />
            )}
        >
        </Route>
    )
}
export default PublicRoute

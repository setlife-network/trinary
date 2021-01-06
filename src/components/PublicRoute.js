import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = (props) => {

    const { component: Component, isLoggedIn, restricted, ...rest } = props
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

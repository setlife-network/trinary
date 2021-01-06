import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = (props) => {

    const { component: Component, isLoggedIn, path, ...rest } = props
    return (
        <Route
            {...rest}
            render={(props) => (
                isLoggedIn ?
                    <Component props={props}/>
                    : <Redirect to='/login'/>
            )}
        >
        </Route>
    )
}
export default PrivateRoute

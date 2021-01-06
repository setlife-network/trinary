import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useReactiveVar } from '@apollo/client'

import { authUser } from '../reactivities/variables'

const PrivateRoute = (props) => {

    const isLoggedIn = useReactiveVar(authUser)

    const { component: Component, ...rest } = props

    console.log('isLoggedIn');
    console.log(isLoggedIn);
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

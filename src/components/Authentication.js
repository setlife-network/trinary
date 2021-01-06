import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { CHECK_SESSION } from '../operations/queries/ContributorQueries'

const Authentication = () => {

    const history = useHistory()

    const [loggedIn, setLoggedIn] = useState(false)
    const { error, loading, data } = useQuery(CHECK_SESSION)
    //
    // const unlisten = history.listen((location, action ) => {
    //     // The current location changed.
    //     console.log('location');
    //     console.log(location);
    //     console.log('action');
    //     console.log(action);
    //     if (location.pathname != '/ login' && data) {
    //         if (!data.checkSession) history.push('/login')
    //     }
    // })

    // useEffect(() => {
    //     console.log('data ue');
    //     console.log(data);
    //     if (data) {
    //         if (!data.checkSession) {
    //             history.push('/login')
    //         } else {
    //             setLoggedIn(true)
    //         }
    //     }
    // }, [data])

    if (loading) {
        return (
            <>
                Loading...
            </>
        )
    }
    if (error) return `Error! ${error.message}`
    return (
        <>
        </>
    )
}

export default Authentication

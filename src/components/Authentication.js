import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { CHECK_SESSION } from '../operations/queries/ContributorQueries'

const Authentication = ({ history }) => {

    const [loggedIn, setLoggedIn] = useState(false)
    const { error, loading, data } = useQuery(CHECK_SESSION)

    useEffect(() => {
        if (data) {
            if (!data.checkSession) {
                history.push('/login')
            } else {
                setLoggedIn(true)
            }
        }
    }, [data])

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

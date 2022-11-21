import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client';

import { authUser, sessionUser } from '../reactivities/variables'
import { CHECK_SESSION } from '../operations/queries/ContributorQueries'

const Authentication = () => {

    const { error, loading, data } = useQuery(CHECK_SESSION)

    useEffect(() => {
        if (data) {
            if (!data.checkSession) {
                authUser(false)
            } else {
                console.log('{ ...data.checkSession }');
                console.log({ ...data.checkSession });
                sessionUser({ ...data.checkSession })
                authUser(true)
            }
        }
    }, [data])

    if (loading) return <div>Loading...</div>

    if (error) return `Error! ${error.message}`
    return (
        <>
        </>
    )
}

export default Authentication

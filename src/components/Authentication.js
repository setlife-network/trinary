import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'

import LoadingProgress from './LoadingProgress'

import { authUser } from '../reactivities/variables'
import { CHECK_SESSION } from '../operations/queries/ContributorQueries'

const Authentication = () => {

    const { error, loading, data } = useQuery(CHECK_SESSION)

    useEffect(() => {
        if (data) {
            if (!data.checkSession) {
                authUser(false)
            } else {
                authUser(true)
            }
        }
    }, [data])

    if (loading) return <LoadingProgress/>

    if (error) return `Error! ${error.message}`
    return (
        <>
        </>
    )
}

export default Authentication

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeVar, useQuery } from '@apollo/client'

import { authUser } from '../reactivities/variables'
import { CHECK_SESSION } from '../operations/queries/ContributorQueries'

const Authentication = () => {

    const history = useHistory()
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

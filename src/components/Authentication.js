import React from 'react'
import { useQuery } from '@apollo/client'

import { CHECK_SESSION } from '../operations/queries/ContributorQueries'

const Authentication = () => {

    const { error, loading, data } = useQuery(CHECK_SESSION)

    if (loading) {
        return (
            <>
                Loading...
            </>
        )
    }

    if (error) return `Error! ${error.message}`

    console.log('data');
    console.log(data);

    return (
        <>
        </>
    )
}

export default Authentication

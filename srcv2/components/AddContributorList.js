import React, { useEffect, useState } from 'react'
import { useQuery, useMutation, useApolloClient, gql } from '@apollo/client'
import { Icon, Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import moment from 'moment'

import { GET_CONTRIBUTORS } from '../operations/queries/ContributorQueries'
import { CREATE_ALLOCATION, CREATE_RATE } from '../operations/mutations/ContributorMutations'
import { GET_PROJECT_CONTRIBUTORS } from '../operations/queries/ProjectQueries'

const AddContributorList = ({
    projectId
}) => {

    const client = useApolloClient()

    const [displayAlert, setDisplayAlert] = useState(false)
    const [selectedContributors, setSelectedContributors] = useState([])

    const {
        data: dataContributors,
        loading: loadingContributors,
        error: errorContributors,
    } = useQuery(GET_CONTRIBUTORS)

    const {
        data: dataProjectContributors,
        loading: loadingProjectContributors,
        error: errorProjectContributors
    } = useQuery(GET_PROJECT_CONTRIBUTORS, {
        variables: {
            id: Number(projectId)
        }
    })

    const [createAllocation, {
        dataNewAllocation,
        loadingNewAllocation,
        errorNewAllocation
    }] = useMutation(CREATE_ALLOCATION, {
        onCompleted: dataNewAllocation => {
            setDisplayAlert(true)
        }
    })

    const [createRate, {
        dataNewRate,
        loadingNewRate,
        errorNewRate
    }] = useMutation(CREATE_RATE)

    useEffect(() => {
        if (errorNewAllocation != undefined || dataNewAllocation != undefined) {
            setDisplayAlert(true)
        }
    }, [errorNewAllocation, dataNewAllocation])

    const handleAddContributor = async (contributor) => {
        const newRate = await createRate({
            variables: {
                hourly_rate: '0',
                total_expected_hours: null,
                minimum_expected_hours: null,
                maximum_expected_hours: null,
                minimum_hourly_rate: null,
                maximum_hourly_rate: null,
                type: 'max_budget',
                currency: null,
                contributor_id: contributor.id
            }
        })
        const newAllocation = await createAllocation({ 
            variables: {
                amount: 0,
                active: true,
                start_date: moment().format('YYYY-MM-DD'),
                contributor_id: contributor.id,
                rate_id: newRate.data.createRate.id,
                project_id: Number(projectId),
                status: 'active'
            }
        })
        setSelectedContributors([...selectedContributors, contributor])
        client.writeQuery({
            query: gql`
                query WriteProject($id: Int!) {
                    project(id: $id) {
                        id
                        contributors {
                            id
                            name
                            avatar_url
                        }
                    }
                }
            `,
            data: {
                project: {
                    __typename: 'Project',
                    id: projectId,
                    contributors: [...dataProjectContributors.getProjectById.contributors, contributor]
                },
            },
            variables: {
                id: projectId
            }
        })
    }

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setDisplayAlert(false)
    }

    const renderContributors = (contributors, projectContributors) => {
        const missingContributors = contributors.filter(c => {
            return ![...projectContributors, ...selectedContributors].some(pC => {
                return c.id === pC.id;
            });
        })
        return missingContributors.map(c => {
            return (
                <div className='grid grid-cols-2 mb-4'>
                    <div>
                        <span className='align-middle'>
                            {c.name}
                        </span>
                    </div>
                    <div className='w-full'>
                        <div className='ml-auto w-fit'>
                            <button
                                type='button'
                                className='rounded-full bg-setlife h-8 w-8 drop-shadow-md'
                                onClick={() => handleAddContributor(c)}
                            >
                                <Icon className='icon fa-solid fa-plus text-white align-middle' fontSize='medium'/>
                            </button>
                        </div>
                    </div>

                </div>
            )
        })
    }

    if (loadingContributors || loadingProjectContributors) return 'Loading...'

    return (
        <div className='AddContributorList'>
            <p className='font-bold text-xl mb-4'>
                Add Contributor
            </p>
            <div className='overflow-scroll'>
                {renderContributors(dataContributors.getContributors, dataProjectContributors.getProjectById.contributors)}
            </div>
            <Snackbar
                autoHideDuration={4000}
                open={displayAlert}
                onClose={handleAlertClose}
            >
                {errorNewAllocation ? (
                    <Alert severity='error'>
                        {`${errorNewAllocation.message}`}
                    </Alert>
                ) : (
                    <Alert>
                        {`Contributor added`}
                    </Alert>
                )}
            </Snackbar>
        </div>
    )
}

export default AddContributorList
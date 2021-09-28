import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ContributorTile from '../components/ContributorTile'
import { MockedProvider } from '@apollo/client/testing'
import { GET_ALLOCATIONS } from '../operations/queries/AllocationQueries'

const project = {
    id: 54
}
const contributor = {
    external_data_url: null,
    github_access_token: null,
    github_handle: 'https://github.com/jdufresne',
    github_id: '347634',
    id: 304,
    name: 'Jon Dufresne',
    toggl_id: null
}
const active = false
const onAddButton = (props) => {
    setOpenAddAllocationDialog(true)
    setContributorClicked(props.contributor)
}
const mocks = [
    {
        request: {
            query: GET_ALLOCATIONS,
            variables: {
                projectId: project.id,
                contributorId: contributor.id
            },
        },
        result: {
            data: {
                getAllocations: {
                    id: 252,
                    amount: 176000,
                    start_date: '1627689600000',
                    end_date: '1630281600000',
                    date_paid: null,
                    contributor: {
                        id: 304,
                        name: 'Sofía Rodríguez'
                    },
                    rate: {
                        id: 360,
                        active: true,
                        hourly_rate: '11',
                        type: 'prorated_monthly',
                        currency: 'USD',
                        total_expected_hours: 160
                    },
                    payment: {
                        id: 166,
                        amount: 100000,
                        client: {
                            id: 39,
                            name: 'Sofia Test Client',
                            currency: 'USD'
                        }
                    },
                    project: {
                        id: 54,
                        name: 'Landmarks',
                        client: {
                            id: 39,
                            name: 'Sofia Test Client',
                            currency: 'USD'
                        }
                    }
                }
            }
        }
    }
]

let getByTestId
let getByText

beforeEach(() => {
    const component = render(
        <MockedProvider 
            mocks={mocks} 
            addTypename={false}
        >
            <ContributorTile 
                active={active} 
                contributor={contributor}
                onAddButton={onAddButton}
                project={project}
            />
        </MockedProvider>
    )
    getByTestId = component.getByTestId
    getByText = component.getByText
})

afterEach(cleanup)

it('Client name', () => {
    expect(getByTestId('client-name').textContent).toBe('SetLife Petrodollars')
})

it('Clicking a client works', () => {
    fireEvent.click(getByTestId('click-tile'))
})
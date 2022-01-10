import React from 'react'
import moment from 'moment'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AllocationTile from '../../components/AllocationTile'
import { MockedProvider } from '@apollo/client/testing'

const mocks = [];

const START_DATE = 1627516800000
const END_DATE = 1627689600000

const allocation = {
    active: true,
    amount: 31500,
    contributor: {
        id: 303
    },
    date_paid: null,
    end_date: `${END_DATE}`,
    id: 271,
    project: {
        client: {
            id: 40,
            name: 'Ovidio Test Client'
        },
        id: 54,
        name: 'Treehouse'
    },
    rate: {
        active: true,
        currency: 'USD',
        hourly_rate: '21',
        id: 414,
        total_expected_hours: 15,
        type: 'prorated_monthly'
    },
    start_date: `${START_DATE}`
}

let getByTestId
let getByText

beforeEach(() => {
    const component = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <AllocationTile allocation={allocation} />
        </MockedProvider>
    )
    getByTestId = component.getByTestId
    getByText = component.getByText
})

afterEach(cleanup)

it('Project name', () => {
    expect(getByTestId('project-name').textContent).toBe('Treehouse')
})

it('Client name', () => {
    expect(getByTestId('client-name').textContent).toBe('Ovidio Test Client')
})

it('Start date', () => {
    const startDate = moment(START_DATE).format('MM/DD/YYYY')
    expect(getByText('Start:').textContent).toBe(`Start:${startDate}`)
})

it('End date', () => {
    const endDate = moment(END_DATE).format('MM/DD/YYYY')
    expect(getByText(/End/i).textContent).toBe(`End:${endDate}`)
})

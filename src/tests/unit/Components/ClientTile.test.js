import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ClientTile from '../../../components/ClientTile'
import { MockedProvider } from '@apollo/client/testing'
import { useHistory } from 'react-router'

const mocks = []
const client = {
    currency: 'USD',
    id: 36,
    is_active: true,
    name: 'SetLife Petrodollars'
}
const history = []

let getByTestId

beforeEach(() => {
    const component = render(
        <MockedProvider 
            mocks={mocks} 
            addTypename={false}
        >
            <ClientTile 
                client={client} 
                history={history}
            />
        </MockedProvider>
    )
    getByTestId = component.getByTestId
})

afterEach(cleanup)

it('Client name', () => {
    expect(getByTestId('client-name').textContent).toBe('SetLife Petrodollars')
})

it('Clicking a client works', () => {
    fireEvent.click(getByTestId('click-tile'))
})
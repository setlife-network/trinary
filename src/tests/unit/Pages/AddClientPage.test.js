import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'

import AddClientPage from '../../../pages/AddClientPage'

let getByTestId
const mocks = []

beforeEach(() => {
    const component = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <AddClientPage />
        </MockedProvider>
    )
    getByTestId = component.getByTestId
})

afterEach(cleanup)

it('Enter info text', () => {
    expect(getByTestId('enter-info-text').textContent).toBe('Enter info below to create a client')
}) 

it('Add project info', () => {
    expect(getByTestId('add-project').textContent).toBe('You can add projects within the newly created client page')
}) 
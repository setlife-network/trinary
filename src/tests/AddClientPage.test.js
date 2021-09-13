import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddClientPage from '../pages/AddClientPage'

let getByTestId

beforeEach(() => {
    const component = render(<AddClientPage />);
    getByTestId = component.getByTestId
})

// afterEach(() => {
//     cleanup()
// })

test('create client renders with correct text', () => {
    const typographyEl = getByTestId('create-client');

    expect(typographyEl.textContent).toBe('Enter info below to create a client')
})

// test('add projects renders with correct text', () => {
//     const typographyEl = getByTestId('add-projects');
 
//     expect(typographyEl.textContent).toB('You can add projects within the newly created client page')
// })
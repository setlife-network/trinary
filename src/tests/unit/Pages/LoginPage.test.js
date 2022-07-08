import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'

import LoginPage from '../../../pages/LoginPage'

let getByTestId

beforeEach(() => {
    const component = render(<LoginPage />);
    getByTestId = component.getByTestId
})

afterEach(() => {
    cleanup()
})

test('Log in button', () => {
    const buttonEl = getByTestId('login-button-text');

    expect(buttonEl.textContent).toBe('Log in with your Github Account')
}) 
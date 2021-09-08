import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ProjectOverview from '../components/ProjectOverview'
import MockedProvider from '@apollo/client/testing'
import GET_PROJECT_TIME_ENTRIES from '../operations/queries/ProjectQueries'

const mockedGetProjectTimeEntries = {
    request: {
        query: GET_PROJECT_TIME_ENTRIES
    },
    result: {
        data: {
            getProjectById: {
                id: '50'
            },
            timeEntries: {
                id: 
            },

        }
    }
}

it('Overview title renders correctly', () => {
    const component = render(<ProjectOverview/>)
    const overviewTitle = component.getByTestId('overview-title')

    expect(overviewTitle).toBeTruthy()
})
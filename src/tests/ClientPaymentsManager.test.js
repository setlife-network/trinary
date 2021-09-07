import React from 'react'
import ClientPaymentsManager from '../components/ClientPaymentsManager'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom/extend-expect'
import MockedProvider from '@apollo/client/testing'
import { GET_CLIENT_TOTAL_PAID } from '../operations/queries/ClientQueries'

const mockGetClientTotalPaid = {
    request: {
        query: GET_CLIENT_TOTAL_PAID,
        variables: {
            id: '40',
            fromDate: null,
            toDate: null
        },
    },
    result: {
        data: {
            getClientById: {
                id: '40',
                currency: 'USD',
                totalPaid(fromDate, toDate) 
            },
        },
    },
};

// it('render clients by id', async () => {
//     let wrapper;
//     await act(async () => {
//         wrapper = mount(
//             <MockedProvider addTypename={false} mocks={mockGetClientTotalPaid}>
//                 <ClientPaymentsManager />
//             </MockedProvider>
//         );
//     });

//     await act(() => wait(0));
//     wrapper.update();
//     expect(wrapper).toBeThruthy();
//     expect(wrapper.find('.test')).toHaveText(

//     );
// })
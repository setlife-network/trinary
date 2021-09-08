import React from 'react'
// import '@testing-library/jest-dom/extend-expect'
// import MockedProvider from '@apollo/client/testing'
// import { GET_ACTIVE_CLIENTS } from '../operations/queries/ClientQueries'
import ClientTile from '../components/ClientTile'
// import { act } from 'react-dom/test-utils'
// import wait from 'waait'
// import { configure, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

test('Client name', () => {
    const component = render(<ClientTile/>);
    const clientName = component.getByTestId('client-name')
    
    expect(clientName).toBeTruthy()
})

// configure({ adapter: new Adapter() });

// const mockGetClients = {
//     request: {
//         query: GET_ACTIVE_CLIENTS,
//     },
//     result: {
//         data: {
//             getClients: {   
//                 id: 35,
//                 name: 'Created From Trinary',
//                 currency: 'USD',
//                 is_active: true
//             },
//         },
//     },
// };

// it('render clients by id', async () => {
//     let wrapper;
//     await act(async () => {
//         wrapper = mount(
//             <MockedProvider addTypename={false} mocks={mockGetClients}>
//                 <ClientTile />
//             </MockedProvider>
//         );
//     });

//     await act(() => wait(0));
//     wrapper.update();
//     expect(wrapper).toBeTruthy();
//     expect(wrapper.find('.client-name')).toHaveText(
//         'Create From Trinary'
//     );
// })
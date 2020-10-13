import React from 'react'

const MOCKED_CLIENT = {
    id: 1,
    name: 'Client A',
    projects: [
        {
            id: 1,
            name: 'Project One',
        }
    ]
}

class ClientDetailPage extends React.Component {
    componentDidMount() {}

    render() {
        return (
            <div className='ClientDetailPage'>
                ClientDetailPage
            </div>
        )
    }
}

export default ClientDetailPage

import React from 'react'
import { useHistory } from 'react-router-dom'

const CreateProjectFloatingButton = () => {

    const history = useHistory()

    return (
        <button
            type='button'
            className='CreateProjectFloatingButton h-14 w-14 bg-setlife fixed bottom-10 right-10 drop-shadow-xl rounded-full'
            onClick={() => history.push('/create-project')}
        > 
            <p className='text-3xl text-white font-bold w-fit h-fit m-auto pb-1'>
                +
            </p>
        </button>
    )
}

export default CreateProjectFloatingButton
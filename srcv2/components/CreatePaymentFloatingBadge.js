import React from 'react'
import { Icon } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const CreatePaymentFloatingBadge = (props) => {
    const {
        projectId
    } = props

    const history = useHistory()

    return (
        <button
            type='button'
            className='CreatePaymentFloatingBadge h-14 w-14 bg-setlife fixed bottom-10 right-10 drop-shadow-xl rounded-full text-3xl'
            onClick={() => history.push(`/add-payment/${projectId}`)}
        > 
            <Icon className='icon fas fa-credit-card text-white font-bold w-fit h-fit m-auto pb-1 leading-8' fontSize='inherit'/>
        </button>
    )
}

export default CreatePaymentFloatingBadge
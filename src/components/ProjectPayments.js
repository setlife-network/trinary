import React, { useState } from 'react'
import moment from 'moment'
import Box from '@material-ui/core/Box'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

import PaymentTile from './PaymentTile'

const MOCKED_PAYMENTS = [
    {
        id: 1,
        amount: 100,
        //date_paid: '1601063721',
        date_paid: null,
        date_incurred: '1602878139',
    },

    {
        id: 2,
        amount: 200,
        date_paid: '1601063721',
        date_incurred: '1600286121',
    },

    {
        id: 3,
        amount: 300,
        date_paid: null,
        date_incurred: '1600286121',
    },

    {
        id: 4,
        amount: 500,
        date_paid: '1601063721',
        date_incurred: '1600286121',
    },

    {
        id: 5,
        amount: 800,
        date_paid: null,
        date_incurred: '1600286121',
    }
]

const ProjectPayments = (props) => {

    const renderPayments = () => {
        // TODO:
        // fetch payments from API
        // store them in state
        // replace the mocked array

        return MOCKED_PAYMENTS.map(p => {
            return (
                <PaymentTile
                    payment={p}
                />
            )
        })
    }

    const calculateTotalPayments = () => {
        return MOCKED_PAYMENTS.reduce((sum, payment) => {
            return sum + payment.amount;
        }, 0)
    }

    return (

        <div className='ProjectPayments'>

            <Box
                className='title-container'
                flexDirection='row'
                display='flex'
                alignItems='baseline'
            >
                <Box
                    className='payments-title'
                    flex={1}
                >
                    Payments
                </Box>
                <Box
                    flex={1}
                    className='usd-total'
                >
                    {`Total: $${calculateTotalPayments()}`}
                </Box>

            </Box>

            <div>
                {renderPayments()}
            </div>

        </div>

    );
}

ProjectPayments.defaultProps = {

};

export default ProjectPayments;

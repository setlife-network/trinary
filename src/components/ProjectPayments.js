import React, { useState } from 'react';

const MOCKED_PAYMENTS = [
    {
        id: 1,
        amount: 100,
        date_paid: null, 
        date_incurred: '1602878139', 
    },
    {
        id: 2,
        amount: 200,
        date_paid: '1601063721', 
        date_incurred: '1600286121', 
    }
]

// Convert to imported component as PaymentTile.js when ready to merge
const PaymentTile = (props) => {
    const { payment } = props
    
    // Log the `payment` object to confirm its data structure

    return (
        <div className='PaymentTile'>
            Amount
        </div>
    )

}

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

    return (
        <div className='ProjectPayments'>
            <h1>Payments</h1>
            {renderPayments()}
            
        </div>
    );
}

ProjectPayments.defaultProps = {
    
};

export default ProjectPayments;

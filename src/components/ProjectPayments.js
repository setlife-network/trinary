import React, { useState } from 'react';

const MOCKED_PAYMENTS = [
    {
        id: 1,
        amount: 100
    },
    {
        id: 2,
        amount: 200
    }
]

// Convert to imported component as PaymentTile.js when ready to merge
const PaymentTile = (props) => {
    const { payment } = props
    
    // Log the `payment` object to confirm its data structure

    return (
        <div className='PaymentTile'>
            PaymentTile
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
            <h1>ProjectPayments</h1>
            {renderPayments()}
            
        </div>
    );
}

ProjectPayments.defaultProps = {
    
};

export default ProjectPayments;

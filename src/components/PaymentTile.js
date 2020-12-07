import React, { useState } from 'react';
import moment from 'moment'
import Box from '@material-ui/core/Box'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

const PaymentTile = (props) => {
    const { payment } = props

    const formattedDatePaid = moment.unix(payment.date_paid).format('MM/DD/YYYY')
    const formattedDateIncurred = moment.unix(payment.date_incurred).format('MM/DD/YYYY')
    const paymentHasBeenMade = payment.date_paid != null

    return (

        <Box
            className='PaymentTile'
            flexDirection='row'
            display='flex'
        >
            <Box flex={1}>
                {`$ ${payment.amount}`}
            </Box>

            {paymentHasBeenMade
                ? (
                    <Box
                        className='DatePaid'
                        flex={2}
                        flexDirection='row'
                        display='flex'
                    >
                        <Box flex={1}>

                            {`${formattedDatePaid}`}

                        </Box>
                        <MonetizationOnIcon className='MoneyIcon'/>
                    </Box>
                ) : (
                    <Box
                        className='DateIncurred'
                        flex={2}
                        flexDirection='row'
                        display='flex'
                    >
                        <Box flex={1}>

                            {`${formattedDateIncurred}`}

                        </Box>
                        <MonetizationOnIcon className='NoMoneyIcon'/>
                    </Box>
                )
            }

        </Box>

    )

}

PaymentTile.defaultProps = {

};

export default PaymentTile;

import React, { useState } from 'react'
import {
    Box,
    Grid
} from '@material-ui/core'

import AllocationAddForm from './AllocationAddForm'
import PaymentTile from './PaymentTile'

const PaymentsList = (props) => {

    const [paymentClicked, setPaymentClicked] = useState(null)
    const [openAddAllocationDialog, setOpenAddAllocationDialog] = useState(false)

    const handleAddAllocationClose = (value) => {
        setOpenAddAllocationDialog(false)
    }

    const {
        payments,
        project
    } = props

    const addAllocation = (props) => {
        setOpenAddAllocationDialog(true)
        setPaymentClicked(props.payment)
    }

    const renderPaymentTiles = (payments) => {
        return payments.map(p => {
            return (
                <Grid item xs={12} sm={6} lg={4}>
                    <Box my={2} onClick={() => addAllocation({ payment: p })}>
                        <PaymentTile
                            payment={p}
                            client={p.client}
                        />
                    </Box>
                </Grid>
            )
        })
    }

    return (
        <Grid container justify='flex-start' className='PaymentsList'>
            {renderPaymentTiles(payments)}
            <Grid item xs={12}>
                {
                    paymentClicked &&
                    <AllocationAddForm
                        project={project}
                        open={openAddAllocationDialog}
                        onClose={handleAddAllocationClose}
                        payment={paymentClicked}
                    />
                }
            </Grid>
        </Grid>
    )
}

export default PaymentsList

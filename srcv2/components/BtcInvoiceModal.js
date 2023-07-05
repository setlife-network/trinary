import React from 'react'
import { Modal, Box } from '@material-ui/core'

export default function BtcInvoiceModal(props) {
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }
    return (
        <>
            <Modal
                open={props.open}
                onClose={props.onClose}
            >
                <Box sx={modalStyle}>
                    <iframe title='invoice' height='660px' src={`${props.bitcoinCheckoutUrl}`}/>
                </Box>
            </Modal>
        </>
    )
}
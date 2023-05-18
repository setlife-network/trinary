import React, { useState, useEffect } from 'react'
import {
    Icon,
    Snackbar
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { useMutation } from '@apollo/client'

import Section from './Section'
import Selector from './Selector'
import { NODE_OPTIONS } from '../constants'
import { UPDATE_NODE } from '../operations/mutations/WalletMutations'

const AdvancedWalletSetup = () => {

    const [host, setHost] = useState(null)
    const [restPort, setRestPort] = useState(null)
    const [macaroon, setMacaroon] = useState(null)
    const [nodeInterface, setNodeInterface] = useState('Node Interface')
    const [openNodeOpts, setOpenNodeOpts] = useState(false)
    const [displayAlert, setDisplayAlert] = useState(false)
    const [disabledButton, setDisabledButton] = useState(true)

    const [
        updateNode,
        {
            data: updateNodeData,
            loading: loadingNodeData,
            error: errorNodeData
        }
    ] = useMutation(UPDATE_NODE)

    useEffect(() => {
        if (errorNodeData != undefined || updateNodeData != undefined) {
            setDisplayAlert(true)
        }
    }, [errorNodeData, updateNodeData])

    useEffect(() => {
        if (host && restPort && macaroon) {
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }
    }, [host, restPort, macaroon])

    const inputOptions = [
        {
            label: 'Host',
            value: host,
            buttonAction: setHost
        },
        {
            label: 'Rest port',
            value: restPort,
            buttonAction: setRestPort
        },
        {
            label: 'Invoice Macaroon',
            value: macaroon,
            buttonAction: setMacaroon
        }
    ]

    const renderNodeOptions = () => {
        const optionClick = (nodeInterface) => {
            setOpenNodeOpts(false)
            setNodeInterface(nodeInterface)
        }
        return NODE_OPTIONS.map(n => {
            return (
                <button 
                    type='button'
                    onClick={() => optionClick(n.name)}
                    className={`text-gray-700 block px-4 py-2 text-sm text-ellipsis overflow-hidden ${n.active ? '' : 'text-light'}`}
                    role='menuitem'
                    disabled={!n.active}
                    tabIndex='-1'
                    id='menu-item-0'
                    key={n.name}
                >
                    {n.name}
                </button>
            )
        })
    }

    const pasteFromClipboard = async (r) => {
        try {
            let text = await navigator.clipboard.readText();
            r.buttonAction(text);
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    }

    const renderAdvancedWalletInputs = () => {
        return inputOptions.map(r => {
            return (
                <div className='relative mt-5'>
                    <input 
                        type='text'
                        placeholder={r.label}
                        value={r.value}
                        onChange={(e) => r.buttonAction(e.target.value)}
                        className='
                            mt-5
                            form-control
                            block
                            w-full
                            pr-11
                            pl-3
                            py-1.5
                            text-black
                            font-normal
                            bg-white bg-clip-padding
                            border border-solid border-light
                            rounded-lg
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-setlife focus:outline-none
                        '
                    />
                    <div className='absolute right-5 top-0 mt-2' onClick={() => pasteFromClipboard(r)}>
                        <Icon fontSize='small' className={'icon fas fa-paste'}/>
                    </div>
                </div>
            )
        })
    }

    const handleSaveNodeButton = async () => {
        const variables = {
            host: host,
            port: Number(restPort),
            macaroon: macaroon
        }
        await updateNode({ variables: variables })
    }

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setDisplayAlert(false)
    }

    return (
        <div className='AdvancedWalletSetup h-full min-h-screen'>
            <Section backgroundColor={'bg-white-light'} className={'h-full min-h-screen px-6'}>
                <div className='flex mb-5'>
                    <p className='font-bold text-lg'>
                        {'Enter your info bellow to set up your node'}
                    </p>
                    <Icon className={`icon fas fa-circle-question my-auto !w-8 ml-auto`}></Icon>
                </div>
                <div className='relative'>
                    <Selector
                        title={nodeInterface}
                        renderOptions={renderNodeOptions}
                        openOptions={openNodeOpts}
                        setOpenOptions={setOpenNodeOpts}
                        loadingOptions={false}
                        buttonClassName='bg-white'
                    />
                </div>
                {renderAdvancedWalletInputs()}
                <div className='grid absolute bottom-10 left-16 right-16 gap-4'>
                    <button
                        type='button'
                        className={`rounded-full py-2 w-full text-white font-bold ${(disabledButton || loadingNodeData) ? 'bg-light' : 'bg-setlife'}`}
                        onClick={() => handleSaveNodeButton()}
                        disabled={disabledButton || loadingNodeData}
                    >
                        Create
                    </button>
                </div>
            </Section>
            <Snackbar
                autoHideDuration={2000}
                open={displayAlert}
                onClose={handleAlertClose}
                className='mb-32 px-5'
            >
                {updateNodeData != undefined ? (
                    <Alert>
                        {`Wallet updated`}
                    </Alert>
                ) : (
                    <Alert severity='error'>
                        {`${errorNodeData}`}
                    </Alert>
                )}
            </Snackbar>
        </div>
    )
}

export default AdvancedWalletSetup
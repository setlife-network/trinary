import React, { useState, useEffect } from 'react'
import {
    Icon,
    Snackbar
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { useMutation } from '@apollo/client'
import axios from 'axios'

import Section from './Section'
import Selector from './Selector'
import { NODE_OPTIONS, API_ROOT } from '../constants'
import { UPDATE_NODE } from '../operations/mutations/WalletMutations'
import { sessionUser } from '../reactivities/variables'

import Overlay from './Overlay'
import AdvancedWalletSetupOnboarding from './AdvancedWalletSetupOnboarding'

const AdvancedWalletSetup = () => {

    const [host, setHost] = useState(sessionUser().wallet ? sessionUser().wallet.lnd_host : '')
    const [port, setPort] = useState(sessionUser().wallet ? sessionUser().wallet.lnd_port : '')
    const [macaroon, setMacaroon] = useState(sessionUser().wallet ? sessionUser().wallet.invoice_macaroon : '')
    const [nodeInterface, setNodeInterface] = useState('LND')
    const [openNodeOpts, setOpenNodeOpts] = useState(false)
    const [displayAlert, setDisplayAlert] = useState(false)
    const [disabledButton, setDisabledButton] = useState(true)
    const [invalidNode, setInvalidNode] = useState(false)
    const [onboardOverlayOpen, setOnboardOverlayOpen] = useState(false)
    const [onboardingScreenIndex, setOnboardingScreenIndex] = useState(0)

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
            setInvalidNode(false)
        }
    }, [errorNodeData, updateNodeData])

    useEffect(() => {
        if (host && port && macaroon) {
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }
    }, [host, port, macaroon])

    const inputOptions = [
        {
            label: 'Rest Host',
            value: host,
            regex: /^([0-9\.]*)$/,
            setValue: setHost
        },
        {
            label: 'Rest Port',
            value: port,
            regex: /^([0-9]{0,4})$/,
            setValue: setPort
        },
        {
            label: 'Admin Macaroon',
            value: macaroon,
            setValue: setMacaroon
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
            r.setValue(text);
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    }

    const handleInputChange = (value, setValue, regex) => {
        if (regex) {
            if (regex.test(value)) {
                setValue(value)
            }
        } else {
            setValue(value)
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
                        onChange={(e) => handleInputChange(e.target.value, r.setValue, r.regex)}
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
        try {
            const response = await axios.post(`${API_ROOT}/connect`, { host, port, macaroon })
            if (response.data.block_hash) {
                setInvalidNode(false)
                const variables = {
                    host: host,
                    port: Number(port),
                    macaroon: macaroon
                }
                await updateNode({ variables: variables })
            } else {
                setInvalidNode(true)
                setDisplayAlert(true)
            }
        } catch (error) {
            setInvalidNode(true)
            setDisplayAlert(true)
        }
    }

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setDisplayAlert(false)
    }

    const openOnboardingOverlay = () => {
        setOnboardingScreenIndex(0)
        setOnboardOverlayOpen(!onboardOverlayOpen)
    }

    return (
        <div className='AdvancedWalletSetup h-full min-h-screen'>
            <Section backgroundColor={'bg-white-light'} className={'h-full min-h-screen px-6'}>
                <div className='flex mb-5'>
                    <p className='font-bold text-lg'>
                        {'Enter your info bellow to set up your node'}
                    </p>
                    <Icon 
                        className={`icon fas fa-circle-question my-auto !w-8 ml-auto`} 
                        onClick={() => setOnboardOverlayOpen(true)}
                    />
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
                        Save
                    </button>
                </div>
            </Section>
            <Snackbar
                autoHideDuration={3000}
                open={displayAlert}
                onClose={handleAlertClose}
                className='mb-32 px-5'
            >
                {updateNodeData != undefined && !invalidNode ? (
                    <Alert>
                        {`Wallet updated`}
                    </Alert>
                ) : (
                    <Alert severity='error'>
                        {'Invalid Node Information'}
                    </Alert>
                )}
            </Snackbar>
            <Overlay
                open={onboardOverlayOpen}
                setOpen={openOnboardingOverlay}
                height={'h-4/5'}
                goBackAction={onboardingScreenIndex == 0 ? false : () => setOnboardingScreenIndex(onboardingScreenIndex - 1)}
            >
                <AdvancedWalletSetupOnboarding
                    onboardingScreenIndex={onboardingScreenIndex}
                    setOnboardingScreenIndex={setOnboardingScreenIndex}
                    setOpen={openOnboardingOverlay}
                />
            </Overlay>
        </div>
    )
}

export default AdvancedWalletSetup
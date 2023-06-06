import React from 'react'
import { Modal, Icon } from '@material-ui/core'

import Section from './Section'

const Overlay = ({
    open,
    setOpen,
    buttonText,
    buttonAction,
    goBackAction,
    height = '',
    fullScreen,
    children,
    containerClassName,
    position = 'bottom'
}) => {

    return (
        <div className='Overlay'>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
                className={'modal fixed inset-0 flex bg-black bg-opacity-50 items-center justify-center transition-opacity duration-300 z-40'}
            >
                <div className={'Overlay fixed inset-5'}>
                    <div
                        className={`bg-white flex flex-col rounded-lg !py-3 px-6 overflow-hidden ${fullScreen ? 'h-full' : position} ${height} ${containerClassName}`}
                    >
                        <div className='y-3'>
                            <Icon 
                                className={`icon fas fa-arrow-left my-3 !w-8 ${goBackAction ? 'visible' : 'invisible'}`}
                                onClick={() => { goBackAction() }}
                            />
                            <Icon 
                                className={`icon fas fa-x !w-8 my-3 absolute top-4 right-4`}
                                onClick={() => { setOpen(false) }}
                            />
                        </div>
                        <div className='flex-grow mt-5'>
                            { children }
                        </div>
                        <button
                            className={`bg-setlife rounded-full py-2 w-full font-bold text-white mt-4 mb-2 self-end ${buttonText ? 'visible' : 'invisible'}`}
                            onClick={() => { buttonAction() }}
                            type='button'
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Overlay
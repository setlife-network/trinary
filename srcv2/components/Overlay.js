import React, { useState } from 'react'
import { Modal, Icon } from '@material-ui/core'

import Section from './Section'
import Step from './Step'

const Overlay = ({
    open,
    setOpen,
    buttonText,
    buttonAction,
    goBackAction,
    height,
    fullScreen,
    title,
    description,
    steps
}) => {

    const renderSteps = () => {
        return steps.map((s, i) => {
            return (
                <Step  
                    title={s.title}
                    number={i + 1}
                />
            )
        })
    }

    return (
        <div className='Overlay'>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
                className={'fixed inset-0 flex bg-black bg-opacity-50 items-center justify-center transition-opacity duration-300 z-40'}
            >
                <div className={'fixed inset-5 mt-20'} onClick={() => { setOpen(false) }}>
                    <Section backgroundColor={'bg-white'} className={`flex flex-col rounded-lg border-2 !py-3 px-6 ${fullScreen ? 'h-full' : ''} ${height ? height : ''}`}>
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
                            <p className='text-3xl font-bold mb-2'>
                                {title}
                            </p>
                            <p>
                                {description}
                            </p>
                            {steps && renderSteps()}
                        </div>
                        <button
                            className='bg-setlife rounded-full py-2 w-full font-bold text-white mt-4 mb-2 self-end'
                            onClick={() => { buttonAction() }}
                            type='button'
                        >
                            {buttonText}
                        </button>
                    </Section>
                </div>
            </Modal>
        </div>
    )
}

export default Overlay
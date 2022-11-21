import React from 'react'

const Selector = ({ title, renderOptions, openOptions, setOpenOptions, loadingOptions }) => {
    return (
        <div>
            <button type='button' className='border border-light rounded-lg px-4 py-1 w-full' onClick={() => setOpenOptions(!openOptions)}>
                <div className='grid grid-flow-col auto-cols-max flex justify-between'>
                    <p className='text-black text-left'>{title}</p>
                    <svg className='-mr-1 ml-2 h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                        <path fillRule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clipRule='evenodd' />
                    </svg>
                </div>
            </button>
            {openOptions &&
                <div 
                    className='absolute right-0 left-0 z-10 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none mx-12 sm:mx-24 md:mx-48 lg:mx-96 max-h-52 overflow-scroll' 
                    role='menu'
                    aria-orientation='vertical' 
                    aria-labelledby='menu-button'
                    tabIndex='-1'
                >
                    <div className='py-1' role='none'>
                        {loadingOptions && 
                            'Loading'
                        }
                        {renderOptions()}
                    </div>
                </div>
            }
        </div>
    )
}

export default Selector
import React from 'react'

const Section = ({
    backgroundColor,
    children,
    className
}) => {
    return (
        <div className={`Section ${backgroundColor} px-12 sm:px-24 md:px-48 lg:px-96 py-8 ${className}`}>
            { children }
        </div>
    )
}

export default Section
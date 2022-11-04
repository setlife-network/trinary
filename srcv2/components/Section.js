import React from 'react'

const Section = ({
    backgroundColor,
    children,
    className
}) => {
    return (
        <div className={`Section ${backgroundColor} px-24 md:px-48 lg:px-64 py-12 ${className}`}>
            { children }
        </div>
    )
}

export default Section
import React from 'react'

const ProjectTile = (props) => {
    
    const {
        project
    } = props

    return (
        <div className='ProjectTile'>
            <div className='grid grid-cols-8 p-4'>
                <div className=''>
                    <p className='font-black text-xl'>
                        {project.name.charAt(0).toUpperCase()}
                    </p>
                </div>
                <div className='col-span-6'>
                    <p className='font-bold'>{project.name}</p>
                </div>
                <div className=''>
                    <p>{project.expected_budget_currency}</p>
                </div>
            </div>
            <hr/>
        </div>
    )
}

export default ProjectTile
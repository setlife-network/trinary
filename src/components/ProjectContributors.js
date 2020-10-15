import React, { useState } from 'react';

const MOCKED_CONTRIBUTORS = [
    {
        id: 1,
        name: 'Alice'
    },
    {
        id: 2,
        name: 'Bob'
    },
]

// Convert to imported component as ContributorTile.js when ready to merge
const ContributorTile = (props) => {
    const { contributor } = props
    
    // Log the `contributor` object to confirm its data structure

    return (
        <div className='ContributorTile'>
            ContributorTile
        </div>
    )

}

const ProjectContributors = (props) => {

    const renderContributors = () => {
        // TODO:
        // fetch contributors from API
        // store them in state
        // replace the mocked array

        return MOCKED_CONTRIBUTORS.map(c => {
            return (
                <ContributorTile
                    contributor={c}
                />
            )
        })
    }

    return (
        <div className='ProjectContributors'>
            <h1>ProjectContributors</h1>
            {renderContributors()}
        </div>
    );
}

ProjectContributors.defaultProps = {
    
};

export default ProjectContributors;

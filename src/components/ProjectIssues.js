import React, { useState } from 'react';

const MOCKED_ISSUES = [
    {
        id: 1,
        github_url: 'https://github.com/setlife-network/website/issues/1'
    },
    {
        id: 2,
        github_url: 'https://github.com/setlife-network/website/issues/2'
    }
]

// Convert to imported component as IssueTile.js when ready to merge
const IssueTile = (props) => {
    const { issue } = props
    
    // Log the `issue` object to confirm its data structure

    return (
        <div className='IssueTile'>
            IssueTile
        </div>
    )

}

const ProjectIssues = (props) => {

    const renderIssues = () => {
        // TODO:
        // fetch issues from API
        // store them in state
        // replace the mocked array

        return MOCKED_ISSUES.map(i => {
            return (
                <IssueTile
                    issue={i}
                />
            )
        })
    }

    return (
        <div className='ProjectIssues'>
            <h1>ProjectIssues</h1>
            {renderIssues()}
        </div>
    );
}

ProjectIssues.defaultProps = {
    
};

export default ProjectIssues;

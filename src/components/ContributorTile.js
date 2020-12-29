import React from 'react'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core/'

const ContributorTile = (props) => {

    const { contributor } = props

    console.log('contributor');
    console.log(contributor);

    return (
        <Box
            className='ContributorTile'
            bgcolor='primary.light_blue'
            borderRadius='borderRadius'
            p={2}
            align='left'
        >
            <Typography>
                <strong>
                    {contributor.name}
                </strong>
            </Typography>
            {contributor.github_handle}
        </Box>
    )

}

export default ContributorTile

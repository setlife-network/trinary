import React from 'react'
import {
    Box,
    Fab,
    Grid,
    Typography
} from '@material-ui/core/'
import AddIcon from '@material-ui/icons/Add';

const ContributorTile = (props) => {

    const { active, contributor } = props

    return (
        <Box
            className='ContributorTile'
            bgcolor={`${active ? 'primary.light_blue' : ''}`}
            borderRadius='borderRadius'
            p={2}
            my={2}
            mx={active ? 1 : 0}
            align='left'
        >
            <Grid container>
                {
                    !active &&
                    <Grid item xs={2}>
                        <Fab
                            color='primary'
                            size='small'
                        >
                            <AddIcon color='action'/>
                        </Fab>
                    </Grid>
                }
                <Grid item xs={10}>
                    <Typography>
                        <strong>
                            {contributor.name}
                        </strong>
                    </Typography>
                    {contributor.github_handle}
                </Grid>
            </Grid>
        </Box>
    )

}

export default ContributorTile

import React from 'react'
import {
    TextField
} from '@material-ui/core'

const SearchFilter = (props) => {
    const {
        setSearch
    } = props

    return (
        <TextField
            placeholder='Search contributors...' 
            onChange={(event) => { setSearch(event.target.value) }}
            fullWidth
            color='primary'
            variant='outlined'
            type={'search'}
            id='search'
        />
    )
}

export default SearchFilter
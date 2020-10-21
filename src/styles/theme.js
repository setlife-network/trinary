import { createMuiTheme } from '@material-ui/core/styles'

import {
    setlifeBlue,
    lightGrey
} from './colors.scss'
import sizes from './sizes.scss'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: setlifeBlue,
        },
        secondary: {
            main: lightGrey,
        },
    },
})

export default theme

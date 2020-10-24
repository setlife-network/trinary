import { createMuiTheme } from '@material-ui/core/styles'

import sizes from './sizes.scss'
import {
    setlifeBlue,
    lightBlue,
    lightGrey,
    black
} from './colors.scss'

const theme = createMuiTheme({
    text: {
        primary: lightGrey,
    },
    palette: {
        primary: {
            main: setlifeBlue,
            dark: black,
            light_blue: lightBlue
        },
        secondary: {
            main: lightGrey,
        },
    },
})

export default theme

import { createMuiTheme } from '@material-ui/core/styles'

import sizes from './sizes.scss'
import {
    setlifeBlue,
    lightBlue,
    darkBlue,
    grey,
    lightGrey,
    black,
    white
} from './colors.scss'

const theme = createMuiTheme({
    text: {
        primary: lightGrey,
    },
    palette: {
        primary: {
            main: setlifeBlue,
            dark: darkBlue,
            black: black,
            light_blue: lightBlue,
            light: white
        },
        secondary: {
            main: grey,
            light: lightGrey
        },
        action: {
            main: lightGrey,
        }
    },
})

export default theme

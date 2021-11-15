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
    typography: {
        button: {
            textTransform: 'capitalize'
        }
    },
    text: {
        textTransform: 'none',
        primary: lightGrey,
    },
    overrides: {
        MuiCardContent: {
            root: {
                padding: 0,
            }
        },
        MuiIcon: {
            root: {
                overflow: 'initial'
            },
        },
        MuiTypography: {
            h4: {
                fontSize: '1.75rem',
                '@media (min-width:376px)': {
                    fontSize: '2.125rem'
                }
            }
        }
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
    }
})


export default theme

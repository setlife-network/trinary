import { createMuiTheme } from '@material-ui/core/styles'

import sizes from './sizes.module.scss'
import flex from './flex.module.scss'
import colors from './colors.module.scss'

const { sm } = flex

const {
    smallFont,
    largeFont
} = sizes

const {
    setlifeBlue,
    lightBlue,
    darkBlue,
    grey,
    lightGrey,
    black,
    white
} = colors

const getMediaQuery = (breakpoint) => (`@media (min-width: ${breakpoint})`)

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
        MuiTooltip: {
            tooltip: {
                fontSize: '1em'
            }
        },
        MuiTypography: {
            h4: {
                fontSize: smallFont,
                [getMediaQuery(sm)]: {
                    fontSize: largeFont
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

import { createMuiTheme } from '@material-ui/core/styles'
import colors from './colors.scss'
import sizes from './sizes.scss'

const theme_colors = {
    setlife_blue: '#00C2D4',
    light_blue: '#d9f6f8',
    light_grey: '#F1F1F1',
    black: '#000000'
}

const theme = createMuiTheme({
    text: {
        primary: theme_colors.light_grey,
    },
    palette: {
        primary: {
            main: theme_colors.setlife_blue,
            dark: theme_colors.black,
            light_blue: theme_colors.light_blue
        },
        secondary: {
            main: theme_colors.light_grey,
        },
    },
})

export default theme

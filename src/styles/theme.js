import { createMuiTheme } from '@material-ui/core/styles';
import colors from './colors.scss';
import sizes from './sizes.scss'

const theme_colors = {
    setlife_blue: '#00C2D4',
    light_grey: '#F1F1F1'
}


const theme = createMuiTheme({

    palette: {
        primary: {
          main: theme_colors.setlife_blue,
        },
        secondary: {
          main: theme_colors.light_grey,
        }
    }
});

export default theme

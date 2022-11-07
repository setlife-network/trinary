const paths = require('react-scripts/config/paths')
const path = require('path')

// Make the 'srcv2' folder be treated as the 'src' folder
paths.appSrc = path.resolve(__dirname, 'srcv2')
// Tell the app that 'src/index.js' has moved to 'srcv2/index.js'
paths.appIndexJs = path.resolve(__dirname, 'srcv2/index.js')
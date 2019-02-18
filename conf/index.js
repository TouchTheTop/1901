const path = require('path')

module.exports = {
    extry:'./js/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    }
}
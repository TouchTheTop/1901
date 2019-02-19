const path = require('path')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
  }

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry:[
       './src/js/index.js'
    ],
    devServer: {
       contentBase: './src'
    },
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'../dist')
    },
    module: {
        rules: [
          {
            test: /\.js(us)?$/,
            include: [
              path.resolve(__dirname, 'src/js')
            ],
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: [ ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose": true }]
                    ]
              }
            }
          }
        ]
      }
}
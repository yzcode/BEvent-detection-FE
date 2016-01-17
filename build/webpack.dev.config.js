/**
 * Created by yangz on 2016/1/17.
 */
var config = require('./webpack.base.config')

config.devtool = 'eval-source-map'

config.devServer = {
  noInfo: true
}

module.exports = config

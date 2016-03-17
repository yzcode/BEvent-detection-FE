/**
 * Created by yangz on 2016/1/17.
 */
var config = require('./webpack.base.config')

config.devtool = 'eval-source-map'

config.devServer = {
  noInfo: true,
  proxy: {
	  '/api/*': {
	    target: 'http://202.119.84.47:8888',
	    secure: false,
	    rewrite: function(req) {
	      req.url = req.url.replace(/^\/api/, '');
	    }
		}
	}
}
module.exports = config

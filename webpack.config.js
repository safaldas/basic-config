var path = require("path");

module.exports = {
	entry : "app.js",
	output : {
		path:path.resolve('./dist'),
		filename:"app.js",
		sourceMapFile:"app.map"
	},
	devtool:'#source-map',
	module:{
		loaders:[
		{
			loader:'babel-loader',
			test:/\.js$/,
			exclude: /node_modules/,
			query:{
				presets:['es2015']
			}
		}
		]
	},
	resolve:{
		root:path.resolve('./src'),
	 	extensions:['.jsx','.js']
	}
} 

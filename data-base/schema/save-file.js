const Schema = require('mongoose').Schema;

let SaveFileSchema = new Schema({
	hash: String,	//文件hash值
	size: Number,
	path: String
})


module.exports = SaveFileSchema;
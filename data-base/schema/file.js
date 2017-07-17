const Schema = require('mongoose').Schema;

let FileSchema = new Schema({
	userId: String,  //用户id
	name: String,	//文件名
	createTime:{	//创建时间
		type: Date,
		default: Date.now
	},
	fileId: String,
	dirId: String 	//文件所属文件夹id
})

module.exports = FileSchema;
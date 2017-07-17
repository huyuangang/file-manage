const Schema = require('mongoose').Schema;

let FolderSchema = new Schema({
	userId: String,
	parentId: String,
	name: String,
	createTime: {
		type: Date,
		default: Date.now
	},
	updateTime: {
		type: Date,
		default: Date.now
	}
})

module.exports = FolderSchema;
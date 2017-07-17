const File = require('../data-base/model/file.js'),
	Folder = require('../data-base/model/folder.js'),
	SaveFile = require('../data-base/model/save-file.js');

const fs = require('fs'),
	path = require('path');
const basePath = path.join(__dirname, '../public/files');

module.exports = function (app) {
	//文件检测
	app.post('/file/check', (req, res) => {
		SaveFile.findOne({ hash: req.body.hash }, (err, cb) => {
			if (err) {
				console.log(err);
			}
			else {
				if (cb) {
					res.json({
						data: cb._id
					})
				}
				else {
					res.json({
						data: null
					})
				}
			}
		})
	})
	//hash上传
	app.post('/file/new', (req, res) => {
		let data = req.body;
		let fileEntity = new File({
			userId: data.userId,
			fileId: data.fileId,
			dirId: data.dirId || null,
			name: data.name
		})
		fileEntity.save((err) => {
			if (err) throw err;
			else {
				res.json({
					data: fileEntity._id
				})
			}
		})
	})
	//上传文件
	app.post('/file/upload', (req, res) => {
		let body = req.body;
		let saveEntity = new SaveFile({
			hash: body.hash
		})
		let path = basePath + '\\' + saveEntity._id;
		let data = body.data.replace(/.+?base64,/, '');
		let str = new Buffer(data,"base64").toString("binary");
		fs.writeFile(path, str, 'binary', (err) => {
			// body
			if (err) {
				console.log(err);
			}
			else {
				fs.stat(path, (err, cb) => {
					if (err) {
						console.log(err);
					}
					else {
						saveEntity.path = path;
						saveEntity.size = cb.size;
						saveEntity.save((e) => {
							if (e) {
								console.log(e);
							}
							else {
								res.json({
									data: true
								});
							}
						})
					}
				})
			}
		})
		let fileEntity = new File({
			userId: body.userId,
			name: body.name,
			fileId: saveEntity._id,
			dirId: body.dirId || null
		});
		fileEntity.save((err) => {
			if (err) {
				console.log(err);
			}
		})
	})
	//删除文件
	app.delete('/file/delete', (req, res) => {
		let data = req.body;
		File.remove({
			userId: data.userId,
			_id: data.fileId
		}, (err) => {
			if (err) {
				res.json({
					data: false
				})
			} else {
				res.json({
					data: true
				})
			}
		})
	})
	//修改文件名
	app.put('/file/update', (req, res) => {
		let data = req.body;
		File.findOne({
			userId: data.userId,
			_id: data.fileId
		}, (err, cb) => {
			if (err) throw err;
			cb.name = data.name;
			cb.save((err) => {
				if (err) throw err;
				res.json({
					data: true
				})
			})
		})
	})
	//文件移动
	app.put('/file/move', (req, res) => {
		let data = req.body;
		File.findOne({
			userId: data.userId,
			_id: data.fileId
		}, (err, cb) => {
			if (err) {
				res.json({
					data: false
				})
				throw err;
			}
			else {
				cb.dirId = data.dirId;
				cb.save((err) => {
					if (err) {
						res.json({
							data: false
						})
						throw err;
					}
					else {
						res.json({
							data: true
						})
					}
				})
			}
		})
	})
	//文件下载
	app.get('/file/download', (req, res) => {
		let data = req.query;
		File.findOne({
			userId: data.userId,
			_id: data.fileId
		}, (err, cb) => {
			SaveFile.findOne({
				_id: cb.fileId
			}, (err, fb) => {
				res.set({
					'Content-Type': 'application/octet-stream',
					'Content-Disposition': 'attachment; filename=' + encodeURIComponent(cb.name)
				})
				fs.createReadStream(fb.path).pipe(res);
			})
		})
	})

	//创建文件夹
	app.post('/folder/create', (req, res) => {
		let data = req.body;
		let folderEntity = new Folder({
			userId: data.userId,
			parentId: data.dirId || null,
			name: data.name
		})
		folderEntity.save((err) => {
			if (err) {
				res.json({
					data: null
				})
				throw err;
			}
			else {
				res.json({
					data: folderEntity._id
				})
			}
		})
	})
	//获取文件列表
	app.get('/folder/list', (req, res) => {
		let data = req.query,
			files = [],
			dirs = [];
		File
			.find({
				userId: data.userId,
				dirId: data.dirId || null
			})
			.sort({ 'name': 1 })
			.exec((err, cb) => {
				if (err) throw err;
				else {
					cb.forEach((item) => {
						files.push({
							_id: item._id,
							name: item.name,
							createTime: item.createTime
						})
					})
					Folder
						.find({
							userId: data.userId,
							parentId: data.dirId || null
						})
						.sort({ 'name': 1 })
						.exec((err, ds) => {
							if (err) throw err;
							else {
								ds.forEach((item) => {
									dirs.push({
										_id: item._id,
										name: item.name,
										updateTime: item.updateTime
									})
								})
								res.json({
									files,
									dirs
								})
							}
						})
				}
			})
	})
	//删除文件夹
	app.delete('/folder/delete', (req, res) => {
		let data = req.body;
		let type = data.type || 0;
		let pId;
		Folder.findOne({
			userId: data.userId,
			_id: data.dirId
		}, (err, cb) => {
			if (err) throw err;
			pId = cb.parentId;
			cb.remove((err) => {
				if (err) {
					res.json({
						data: false
					})
					throw err;
				}
				else {
					if (type === 0) {
						Folder.remove({
							userId: data.userId,
							parentId: data.dirId
						}, (err) => {
							if (err) throw err;
						})
						File.remove({
							userId: data.userId,
							dirId: data.dirId
						}, (err) => {
							if (err) throw err;
							res.json({
								data: true
							})
						})
					}
					else {
						Folder.find({
							userId: data.userId,
							parentId: data.dirId
						}, (err, cb) => {
							cb.forEach((item) => {
								item.parentId = pId;
								item.save((err) => {
									if (err) throw err;
								})
							})
						})
						File.find({
							userId: data.userId,
							dirId: data.dirId
						}, (err, cb) => {
							cb.forEach((item) => {
								item.dirId = pId;
								item.save((err) => {
									if (err) throw err;
								})
							})
						})
						res.json({
							data:true
						})
					}
				}
			})
		})
	})
	//修改文件夹名
	app.put('/folder/update', (req, res) => {
		let data = req.body;
		Folder.findOne({
			userId: data.userId,
			_id: data.dirId
		}, (err, cb) => {
			cb.name = data.name;
			cb.save((err) => {
				if (err) throw err;
				else {
					res.json({
						data: true
					})
				}
			})
		})
	})
	//移动文件夹
	app.put('/folder/move', (req, res) => {
		let data = req.body;
		Folder.findOne({
			userId: data.userId,
			_id: data.dirId
		}, (err, cb) => {
			if (err) throw err;
			else {
				cb.parentId = data.parentId;
				cb.save((err) => {
					if (err) throw err;
					else {
						res.json({
							data: true
						})
					}
				})
			}
		})
	})
}



const mongoose = require('mongoose');
const FolderSchema = require('../schema/folder.js');
let Folder = mongoose.model('folder', FolderSchema);
module.exports = Folder;
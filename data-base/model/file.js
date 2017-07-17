const mongoose = require('mongoose');
const FileSchema = require('../schema/file.js');
let File = mongoose.model('file', FileSchema);
module.exports = File;
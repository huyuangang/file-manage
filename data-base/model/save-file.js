const mongoose = require('mongoose');
const SaveFileSchema = require('../schema/save-file.js');
let SaveFile = mongoose.model('saveFile', SaveFileSchema);
module.exports = SaveFile;
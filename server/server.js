
const express = require('express'),
	  path = require('path'),
	  bodyParser = require('body-parser'),
	  mongoose = require('mongoose');
let app = express();
mongoose.connect('mongodb://localhost/disk');

// app.set('view engine','ejs');
// app.set('views',path.join(__dirname,'../app/view'));
// app.use(express.static(path.join(__dirname,'../app/public')));

app.use(bodyParser.json({
	limit: "5mb"
}));
app.use(bodyParser.urlencoded({extended:true}));

require('../api/api.js')(app);

var server = app.listen(3000,function(){
    var port = server.address().port;
    console.log('This server is listen at localhost:%s',port);
})

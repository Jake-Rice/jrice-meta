var express = require('express');
var mongo = require('mongodb');
var multer  = require('multer');
var autoReap  = require('multer-autoreap');
var upload = multer({ dest: 'uploads/' });

var app = express();
app.use(autoReap);
app.set('views', 'views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

mongo.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/jrice-meta', function(err, db) {
  if (err) console.log(err);
  else console.log('Successfully connected to MongoDB');
  //searches=db.collection('searches');
  app.listen(process.env.PORT || 8080);
});

app.get('/', function (req, res) {
  res.render('index.html');
});

app.post('/get-file-size', upload.single('file'), function (req, res, next) {
  var size=req.file.size;
  res.type('application/json');
  res.send({'size': size});
});

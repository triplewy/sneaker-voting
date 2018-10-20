// use strict compiling
"use strict";
require('dotenv').config()
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var named = require('named-placeholders')();
var path = require('path');
var colors = require('colors');
var mysql = require('mysql')
var aws = require('aws-sdk')
var multer = require('multer');
var multerS3 = require('multer-s3')
var uuidv1 = require('uuid/v1');
var bcrypt = require('bcrypt');
var fs = require('fs')
var validator = require('validator');
var cors = require('cors')

var s3 = new aws.S3()
var app = express();
var server = http.createServer(app)

app.use(cors({credentials: true, origin: true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    key: function (req, file, cb) {
      cb(null, uuidv1() + '.jpg')
    }
  }),
  limits: {fileSize: 10000000, files: 5},
  fileFilter: function(request, file, callback) {
     var mime = file.mimetype
     if (mime !== 'image/png' && mime !== 'image/jpg' && mime !== 'image/jpeg') {
          return callback(new Error('Only images are allowed'), false);
      }
      callback(null, true)
  }
}).array('image', 5);

const originalQuery = require('mysql/lib/Connection').prototype.query;

require('mysql/lib/Connection').prototype.query = function (...args) {
    if (Array.isArray(args[0]) || !args[1]) {
        return originalQuery.apply(this, args);
    }
    ([
        args[0],
        args[1]
    ] = named(args[0], args[1]));

    return originalQuery.apply(this, args);
};

var conn = mysql.createConnection({
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE,
  timezone: 'utc'
});

// conn.query('SET foreign_key_checks = 0')
// conn.query('DROP TABLE IF EXISTS posts')
// conn.query('DROP TABLE IF EXISTS postsImages')
// conn.query('DROP TABLE IF EXISTS votes')
// conn.query('SET foreign_key_checks = 1')

conn.query('CREATE TABLE IF NOT EXISTS posts (mediaId INTEGER AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, votes INTEGER DEFAULT 0, dateTime DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL);')
conn.query('CREATE TABLE IF NOT EXISTS postsImages (imageId INTEGER AUTO_INCREMENT PRIMARY KEY, mediaId INTEGER NOT NULL, imageUrl VARCHAR(255) NOT NULL, FOREIGN KEY (mediaId) REFERENCES posts(mediaId))')
conn.query('CREATE TABLE IF NOT EXISTS votes (voteId INTEGER AUTO_INCREMENT PRIMARY KEY, mediaId INTEGER NOT NULL, dateTime DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, FOREIGN KEY (mediaId) REFERENCES posts(mediaId));')

// conn.query('CREATE TRIGGER after_votes_insert AFTER INSERT ON votes FOR EACH ROW BEGIN ' +
// 'UPDATE posts SET votes = (SELECT COUNT(*) FROM votes WHERE mediaId = NEW.mediaId) WHERE mediaId = NEW.mediaId; END;')

var uploadRoutes = require('./routes/uploadRoutes')

var feedRoutes = require('./routes/feedRoutes')
var itemRoutes = require('./routes/itemRoutes')

var testData = require('./routes/testData')

app.use('/api/upload', uploadRoutes(upload, conn))

app.use('/api/feed', feedRoutes(conn))

app.use('/api/item', itemRoutes(conn))

server.listen(8082, function(){
    console.log('- Server listening on port 8082');
});

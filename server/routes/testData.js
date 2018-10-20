module.exports = function(conn) {
    'use strict';

    var bcrypt = require('bcrypt')

    conn.query('INSERT INTO posts (name, title, email) VALUES (?, ?, ?)', [], function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Records successfully added");
      }
    })

    conn.query('INSERT INTO posts (name, title, email) VALUES (?, ?, ?)', [], function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Records successfully added");
      }
    })

    conn.query('INSERT INTO postsImages (mediaId, imageUrl, width, height) VALUES (?, ?, ?, ?)', [1, 'https://s3.us-east-2.amazonaws.com/drip.io-images/f9a3b6e0-c976-11e8-880d-a9d952d8880f.jpg', 1080, 1350], function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Records successfully added");
      }
    })
};

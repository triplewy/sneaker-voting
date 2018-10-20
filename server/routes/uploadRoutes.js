module.exports = function(upload, conn) {
    'use strict';
    var uploadRoutes = require('express').Router();

    uploadRoutes.post('/', (req, res) => {
      console.log('- Request received:', req.method.cyan, '/api/upload');
      upload(req, res, function(err) {
        if (err) {
          console.log(err);
          res.send({message: err.message})
        } else {
          uploadPost(req)
          .then(function(data) {
            uploadPostImages(req, data)
            .then(function(data) {
              console.log("Records added successfully");
              res.send(data)
            })
            .catch(e => {
              console.log(e);
              res.send({message: 'fail'})
            })
          })
          .catch(e => {
            console.log(e);
            res.send({message: 'fail'})
          })
        }
      })
    })

    return uploadRoutes;

    function uploadPost(req) {
      return new Promise(function(resolve, reject) {
        const body = req.body
        conn.query('INSERT INTO posts (name, title, email) VALUES (:name, :title, :email)', {name: body.name, title: body.title, email: body.email}, function(err, result) {
          if (err) {
            return reject(err)
          } else {
            return resolve(result.insertId)
          }
        })
      })
    }

    function uploadPostImages(req, mediaId) {
      return new Promise(function(resolve, reject) {
        const files = req.files
        var query = ''
        var postsImages = []
        for (var i = 0; i < files.length; i++) {
          postsImages.push(mediaId, files[i].location)
          query += '(?,?),'
        }
        query = query.slice(0, -1)
        conn.query('INSERT INTO postsImages (mediaId, imageUrl) VALUES ' + query, postsImages, function(err, result) {
          if (err) {
            return reject(err);
          } else {
            return resolve({message: 'success'})
          }
        })
      })
    }
};

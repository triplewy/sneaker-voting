module.exports = function(conn) {
    'use strict';
    var feedRoutes = require('express').Router();

    feedRoutes.get('/top', (req, res) => {
      console.log('- Request received:', req.method.cyan, '/api/feed/top');
      conn.query('SELECT a.*, b.imageUrls ' +
      'FROM posts AS a ' +
      'JOIN (SELECT mediaId, JSON_ARRAYAGG(JSON_OBJECT(\'imageUrl\', imageUrl)) AS imageUrls FROM postsImages GROUP BY mediaId) b ON b.mediaId = a.mediaId ' +
      'ORDER BY a.votes DESC LIMIT 20', [], function(err, result) {
        if (err) {
          console.log(err);
        } else {
          for (var i = 0; i < result.length; i++) {
            result[i].imageUrls = JSON.parse(result[i].imageUrls)
          }
          res.send(result)
        }
      })
    })

    feedRoutes.get('/top/:votes', (req, res) => {
      console.log('- Request received:', req.method.cyan, '/api/feed/top/' + req.params.votes);
      conn.query('SELECT a.*, b.imageUrls ' +
      'FROM posts AS a ' +
      'JOIN (SELECT mediaId, JSON_ARRAYAGG(JSON_OBJECT(\'imageUrl\', imageUrl)) AS imageUrls FROM postsImages GROUP BY mediaId) b ON b.mediaId = a.mediaId ' +
      'WHERE a.votes < :votes ORDER BY a.votes DESC LIMIT 20', {votes: req.params.votes}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          for (var i = 0; i < result.length; i++) {
            result[i].imageUrls = JSON.parse(result[i].imageUrls)
          }
          res.send(result)
        }
      })
    })

    feedRoutes.get('/new', (req, res) => {
      console.log('- Request received:', req.method.cyan, '/api/feed/new');
      conn.query('SELECT a.*, b.imageUrls ' +
      'FROM posts AS a ' +
      'JOIN (SELECT mediaId, JSON_ARRAYAGG(JSON_OBJECT(\'imageUrl\', imageUrl)) AS imageUrls FROM postsImages GROUP BY mediaId) b ON b.mediaId = a.mediaId ' +
      'ORDER BY a.dateTime DESC LIMIT 20', [], function(err, result) {
        if (err) {
          console.log(err);
        } else {
          for (var i = 0; i < result.length; i++) {
            result[i].imageUrls = JSON.parse(result[i].imageUrls)
          }
          res.send(result)
        }
      })
    })

    feedRoutes.get('/new/:date', (req, res) => {
      console.log('- Request received:', req.method.cyan, '/api/feed/new/' + req.params.date);
      conn.query('SELECT a.*, b.imageUrls ' +
      'FROM posts AS a ' +
      'JOIN (SELECT mediaId, JSON_ARRAYAGG(JSON_OBJECT(\'imageUrl\', imageUrl)) AS imageUrls FROM postsImages GROUP BY mediaId) b ON b.mediaId = a.mediaId ' +
      'WHERE a.dateTime < :date ORDER BY a.dateTime DESC LIMIT 20', {date: req.params.date}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          for (var i = 0; i < result.length; i++) {
            result[i].imageUrls = JSON.parse(result[i].imageUrls)
          }
          res.send(result)
        }
      })
    })

    return feedRoutes;

};

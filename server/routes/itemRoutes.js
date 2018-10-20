module.exports = function(conn) {
    'use strict';
    var itemRoutes = require('express').Router();

    itemRoutes.post('/vote', (req, res) => {
      console.log('- Request received:', req.method.cyan, '/api/item/vote');
      conn.query('INSERT INTO votes (mediaId) VALUES (:mediaId)', {mediaId: req.body.mediaId}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.send({message: 'success'})
        }
      })
    })

    return itemRoutes;

};

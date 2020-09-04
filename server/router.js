const router = require('express').Router();
const controller = require('./controller.js');
const redis = require('redis')
const client = redis.createClient();

let redisMiddleware = (req, res, next) => {
  let key = "__expIress__" + req.originalUrl || req.url;
  client.get(key, function (err, reply) {
      if (reply) {
          res.send(reply);
      } else {
          res.sendResponse = res.send;
          res.send = (body) => {
              client.set(key, JSON.stringify(body));
              res.sendResponse(body);
          }
          next();
      }
  });
};

router
  .route('/search/:query')
  .get(redisMiddleware, controller.get)

module.exports = router;
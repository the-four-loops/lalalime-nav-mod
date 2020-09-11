const relice = require('newrelic');
// const redis = require('redis')
// const client = redis.createClient();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const router = require('./router.js');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/dist')));

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

app.use('/api', router);


app.listen(port, () => console.log(`Listening on port ${port}`));
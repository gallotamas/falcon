var express = require('express');
var path = require('path');
var fs = require('fs');
var logger = require('morgan');
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var Repository = require('./server/repository');
var SocketService = require('./server/socket-service');
var PublishApi = require('./server/publish-api');
var ImpressionsApi = require('./server/impressions-api');

var app = express();
var staticRoot = __dirname + '/dist/';
var dataRoot = __dirname + '/data/';
var repository = new Repository();

app.set('port', (process.env.PORT || 3000));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(staticRoot));
app.use(function(req, res, next){
    // if this is an API request then move along
    if (/\/api\//.test(req.path)){
        return next();
    }
    // serve index.html
    fs.createReadStream(staticRoot + 'index.html').pipe(res);
});

var server = app.listen(app.get('port'), function() {
    console.log('app running on port', app.get('port'));
});

// Listen for websocket connections and init socket service.
var io = socketio.listen(server);
var socketService = new SocketService(io);

// Init REST apis.
var publishApi = new PublishApi(app, repository, socketService);
var impressionsApi = new ImpressionsApi(app, repository, socketService);

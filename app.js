var express = require('express');
var path = require('path');
var fs = require('fs');
var logger = require('morgan');
var Repository = require('./server/repository');

var app = express();
var staticRoot = __dirname + '/dist/';
var dataRoot = __dirname + '/data/';
var repository = new Repository();

app.set('port', (process.env.PORT || 3000));

app.use(logger('dev'));
app.use(express.static(staticRoot));
app.use(function(req, res, next){
    // if this is an API request then move along
    if (/\/api\//.test(req.path)){
        return next();
    }

    // if the request is not html then move along
    var accept = req.accepts('html', 'json', 'xml');
    if(accept !== 'html'){
        return next();
    }

    // if the request has a '.' assume that it's for a file, move along
    var ext = path.extname(req.path);
    if (ext !== ''){
        return next();
    }

    fs.createReadStream(staticRoot + 'index.html').pipe(res);

});

app.listen(app.get('port'), function() {
    console.log('app running on port', app.get('port'));
});

app.get('/api/publishing-items', function(req, res) {
    repository.getPublishingItems().then((publishingItems) => {
        res.send(publishingItems);
    });
});

app.post('/api/publishing-items', function(req, res) {
    res.send('Got a POST request at /publishing-items/');
});

app.put('/api/publishing-items/:id', function(req, res) {
    res.send('Got a PUT request at /publishing-items/' + req.params.id);
});

app.delete('/api/publishing-items/:id', function(req, res) {
    res.send('Got a DELETE request at /publishing-items/' + req.params.id);
});

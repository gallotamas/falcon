var express = require('express');
var path = require('path');
var fs = require('fs');
var logger = require('morgan');
var bodyParser = require('body-parser');
var Repository = require('./server/repository');

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
    var publishingItems = repository.getPublishingItems();
    res.send(publishingItems);
});

app.get('/api/publishing-items/:id', function(req, res) {
    var publishingItem = repository.getPublishingItem(req.params.id);
    res.send(publishingItem);
});

app.post('/api/publishing-items', function(req, res) {
    var createdItem = repository.createPublishingItem(req.body);
    res.send(createdItem);
});

app.put('/api/publishing-items/:id', function(req, res) {
    var updatedItem = repository.updatePublishingItem(req.params.id, req.body);
    res.send(updatedItem);
});

app.delete('/api/publishing-items/:id', function(req, res) {
    repository.deletePublishingItem(req.params.id);
    res.send();
});

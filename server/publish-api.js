/**
 * Provides a REST api for publishing items.
 */
class PublishApi {
    constructor(app, repository, socketService) {
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
            socketService.emitCreatedPublishingItem(createdItem);
            res.send(createdItem);
        });

        app.put('/api/publishing-items/:id', function(req, res) {
            var updatedItem = repository.updatePublishingItem(req.params.id, req.body);
            socketService.emitUpdatedPublishingItem(updatedItem);
            res.send(updatedItem);
        });

        app.delete('/api/publishing-items/:id', function(req, res) {
            repository.deletePublishingItem(req.params.id);
            socketService.emitDeletedPublishingItem(req.params.id);
            res.send();
        });
    }
}

module.exports = PublishApi;
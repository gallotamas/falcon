var io;
var publishNamespace;
var reachNamespace;

var createdPublishingItemEvent = 'created_publishing_item';
var updatedPublishingItemEvent = 'updated_publishing_item';
var deletedPublishingItemEvent = 'deleted_publishing_item';

/**
 * Handles websocket communication.
 */
class SocketService {
    constructor(socketio) {
        io = socketio;
        publishNamespace = io.of('/publish');
        reachNamespace = io.of('/reach');
        
        publishNamespace.on('connection', function (socket) {
            console.log('A new user has connected to the "publish" namespace');

            socket.on('disconnect', function () {
                console.log('A user has disconnected from the "publish" namespace');
            });
        });
        
        reachNamespace.on('connection', function (socket) {
            console.log('A new user has connected to the "reach" namespace');
            
            socket.on('disconnect', function () {
                console.log('A user has disconnected from the "reach" namespace');
            });
        });
    }

    /**
     * Emits the created publising item to all connected clients.
     * @param publishingItem - The new publishing item.
     */
    emitCreatedPublishingItem(publishingItem) {
        publishNamespace.emit(createdPublishingItemEvent, publishingItem);
    }

    /**
     * Emits the updated publising item to all connected clients.
     * @param publishingItem - The updated publishing item.
     */
    emitUpdatedPublishingItem(publishingItem) {
        publishNamespace.emit(updatedPublishingItemEvent, publishingItem);
    }

    /**
     * Emits the id of the deleted publishing item to all connected clients.
     * @param id - The id of the deleted publishing item.
     */
    emitDeletedPublishingItem(id) {
        publishNamespace.emit(deletedPublishingItemEvent, id);
    }
}

module.exports = SocketService;
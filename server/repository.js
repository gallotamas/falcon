var Promise = require('promise');
var fs = require('fs');
var _ = require('lodash');

var publishingItems = {};

/**
 * Represent an in memory repository.
 */
class Repository {

    /**
     * Init repository.
     */
    constructor() {
        console.log('Initializing repository...');
        readPublishingItems();
        console.log('Publishing items are loaded.');
    }

     /**
      * Gets all the publishing items.
      */
     getPublishingItems() {
         return _.values(publishingItems);
     }

     /**
      * Gets the publishing item with the id provided.
      * @param id - The id of the publishing item.
      */
     getPublishingItem(id) {
         return publishingItems[id];
     }

     /**
      * Updates a publishing item.
      * @param id - The id of the publishing item.
      * @param publishingItem - The new publishing item. 
      */
     updatePublishingItem(id, publishingItem) {
         publishingItems[id] = publishingItem;
         return publishingItem;
     }

     /**
      * Deletes the publishing item with the id provided.
      * @param id - The id of the publishing item.
      */
     deletePublishingItem(id) {
         delete publishingItems[id];
     }
}

function readFile(path) {
    var promise = new Promise(function (resolve, reject) {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                throw err;
            }
            resolve(JSON.parse(data));
         });
    });
    return promise;
}

function readPublishingItems() {
    readFile(__dirname + '/../data/publishing-items.json').then((items) => {
        _.forEach(items, (item) => {
            publishingItems[item.id] = item;
        });
    });
}

module.exports = Repository;
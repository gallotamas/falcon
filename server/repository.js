var Promise = require('promise');
var fs = require('fs');
var publishingItems;

/**
 * Represent an in memory repository.
 */
class Repository {

    /**
     * Gets all the publishing items.
     */
     getPublishingItems() {
         if (!publishingItems) {
             return readPublishingItems();
         }
         return Promise.resolve(publishingItems);
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
    return readFile(__dirname + '/../data/publishing-items.json').then((res) => {
        publishingItems = res;
        return res;
    });
}

module.exports = Repository;
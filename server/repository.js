var Promise = require('promise');
var shortid = require('shortid');
var fs = require('fs');
var _ = require('lodash');

var publishingItems = {};   // Use an object as an associative array (map).
var reachData;

/**
 * Represents an in memory repository.
 */
class Repository {

    /**
     * Init repository.
     */
    constructor() {
        console.log('Initializing repository...');
        readPublishingItems();
        console.log('Publishing items are loaded.');
        readReachData();
        console.log('Reach data loaded.');
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
      * Creates a publishing item.
      * @param publishingItem - The new publishing item. 
      */
     createPublishingItem(publishingItem) {
         let id = shortid.generate();
         publishingItem.id = id;
         publishingItems[id] = publishingItem;
         return publishingItem;
     }

     /**
      * Updates a publishing item.
      * @param id - The id of the publishing item.
      * @param publishingItem - The updated publishing item. 
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

     /**
      * Gets impressions grouped by timestamp.
      */
     getImpressions() {
         let impressions = [];
         _(reachData)
            .filter(reach => { return reach.post_impressions; })  // filter out invalid values.
            .forEach(reach => {
                // find the data item with this timestamp.
                var existingImpression = _.find(impressions, (impression) => {
                        return impression.timestamp === reach.post_impressions[0].timestamp;
                    });

                if (existingImpression) {
                    // update data item (sum values).
                    existingImpression.total += _.parseInt(reach.post_impressions[0].value);
                    existingImpression.organic += _.parseInt(reach.post_impressions_organic[0].value);
                    existingImpression.viral += _.parseInt(reach.post_impressions_viral[0].value);
                    existingImpression.paid += _.parseInt(reach.post_impressions_paid[0].value);
                } else {
                    // create a new data item.
                    impressions.push(convertReachItemToImpression(reach));
                }
            });
         return _.sortBy(impressions, 'timestamp');
     }

     /**
      * Adds a new impression to the repository.
      */
     addImpression(impression) {
         reachData.push(convertImpressionToReachItem(impression));
     }

     getLatestImpression() {
         var latest = _(reachData)
            .filter(item => { return item.post_impressions; })  // filter out invalid values.
            .maxBy(item => item.post_impressions[0].timestamp);
        
        return latest ? convertReachItemToImpression(latest) : null;
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

function readReachData() {
    readFile(__dirname + '/../data/reach.json').then(items => {
        reachData = items;
    });
}

function convertReachItemToImpression(reachItem) {
    return {
        timestamp: reachItem.post_impressions[0].timestamp,
        total: _.parseInt(reachItem.post_impressions[0].value),
        organic: _.parseInt(reachItem.post_impressions_organic[0].value),
        viral: _.parseInt(reachItem.post_impressions_viral[0].value),
        paid: _.parseInt(reachItem.post_impressions_paid[0].value)
    }
}

function convertImpressionToReachItem(impression) {
    return {
        post_impressions: [{ value: impression.total.toString(), timestamp: impression.timestamp }],
        post_impressions_organic: [{ value: impression.organic.toString(), timestamp: impression.timestamp }],
        post_impressions_viral: [{ value: impression.viral.toString(), timestamp: impression.timestamp }],
        post_impressions_paid: [{ value: impression.paid.toString(), timestamp: impression.timestamp }]
    }
}

module.exports = Repository;
/**
 * Provides a REST api for impressions.
 */
class ImpressionsApi {
    constructor(app, repository, socketService) {
        app.get('/api/post-impressions', function(req, res) {
            var impressions = repository.getImpressions();
            res.send(impressions);
        });

        // add new impressions periodically.
        // NOTE: this is just for demonstration purposes.
        setInterval(() => {
            var latestImpression = repository.getLatestImpression();
            var impression = generateImpression(latestImpression);
            repository.addImpression(impression);
            socketService.emitCreatedImpression(impression);
        }, 15000);
    }
}

function generateImpression(latestImpression) {
    var timestamp = new Date(latestImpression.timestamp);
    timestamp.setMinutes(timestamp.getMinutes() + 10);
    var organic = Math.random() * 500000;
    var viral = Math.random() * 70000;
    var paid = 0;
    var total = organic + viral + paid;

    return {
        timestamp: timestamp.toJSON(),
        total: total,
        organic: organic,
        viral: viral,
        paid: 0
    };
}

module.exports = ImpressionsApi;
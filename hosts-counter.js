

const sqlite = require('sqlite3');
const cliProgress = require('cli-progress');

const PODCAST_INDEX_DB_FILE_PATH = 'C:\\Temp\\podcastindex_feeds.db';

const bar = new cliProgress.SingleBar();

const podcastIndexDb = new sqlite.Database(PODCAST_INDEX_DB_FILE_PATH, sqlite.OPEN_READONLY, async (err) => {
    if(err) {
        console.error(err);
        return;
    }

    const rowsCount = await countPodcasts(podcastIndexDb);

    bar.start(rowsCount, 0)

    let counter = 0;
    let hostCounter = {};

    podcastIndexDb.each('select url from podcasts', function (err, row) {
        counter++;
        bar.update(counter);
        try {
            const host = new URL(row.url).host;
            hostCounter[host] = hostCounter[host] || {};
            hostCounter[host].count = hostCounter[host].count || 0;
            hostCounter[host].count++;
            hostCounter[host].sampleUrl = hostCounter[host].sampleUrl || row.url;
        }
        catch(e) {
            console.error(e);
        }
    }, function() {
        bar.stop();
        
        let hostCounterArray = [];

        for(key in hostCounter) {
            hostCounterArray.push({
                host: key,
                ...hostCounter[key]
            })
        }

        hostCounterArray.sort((a, b) => b.count - a.count);

        console.log(JSON.stringify(hostCounterArray));
    })
});

function countPodcasts(database) {
    return new Promise((resolve, reject) => {
        podcastIndexDb.get('select COUNT(*) from podcasts', (err, row) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(row['COUNT(*)']);
            }
        });
    });
}
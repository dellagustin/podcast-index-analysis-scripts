const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const hosts = require('./hosts.json');

const MAX_TOP_HOSTS = 40;
const REQUEST_METHOD = 'GET';
const ORIGIN = 'myarbitrarydomain.org'

main();

async function main() {
    const topHosts = hosts.slice(0, MAX_TOP_HOSTS);

    console.log('host, feeds count, access-control-allow-origin, access-control-allow-methods, last-modified, etag')

    for(let i = 0; i < topHosts.length; i++) {
        const host = topHosts[i];
        
        const output = {};

        const response = await fetch(host.sampleUrl, {
            method: REQUEST_METHOD,
            headers: {
                // adding origin makes the request closer to what the browser sends,
                // without it, some hosts will not add CORS headers to the response
                'origin': ORIGIN
            }
        });

        // CORS headers
        output['access-control-allow-origin'] = response.headers.get('access-control-allow-origin');
        output['access-control-allow-methods'] = response.headers.get('access-control-allow-methods');

        // HTTP conditional requests headers
        output['last-modified'] = response.headers.get('last-modified');
        output['etag'] = response.headers.get('etag');

        // console.log(response.headers);
        // console.log(`Host: ${host.host}, Feeds count: ${host.count}, access-control-allow-origin: ${response.headers.get('access-control-allow-origin')}`);
        console.log(`"${host.host}", "${host.count}", "${output['access-control-allow-origin']}", "${output['access-control-allow-methods']}", "${output['last-modified']}", "${output['etag']}"`);
    }
}


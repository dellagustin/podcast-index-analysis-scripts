# podcast-index-analysis-scripts

This repository contains scripts created to check [CORS] and [HTTP conditional requests] headers capabilities on podcasts hosts.

[CORS]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[HTTP conditional requests]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Conditional_requests

This is to provide information for discussions on the Podcast Standards Project (https://podstandards.org/).  
See [Is PSP-1 also covering guidelines to serve RSS feeds over HTTP?](https://github.com/Podcast-Standards-Project/PSP-1-Podcast-RSS-Specification/issues/2).

The analysis is done for top 40 hosts (based on number of feeds per hosts).  
The number of feeds per hosts is calculated based on the sqlite database from https://podcastindex.org/.

## Usage

Put the database file on `C:\Temp\podcastindex_feeds.db` (or modify the hard code path in `hosts-counter.js` if you want ot use other path).

Install the dependencies with `npm install`.

Run `node hosts-counter.js > hosts.json`.

When it is finished, run `node test-hosts.js > hosts-result.csv`.

The resulting CSV file contains the following columns:

- host, 
- feeds count, 
- access-control-allow-origin, 
- access-control-allow-methods, 
- last-modified, 
- etag

The last for are headers from the response of the host for a sample feed. These are headers used in CORS and HTTP conditional requests.
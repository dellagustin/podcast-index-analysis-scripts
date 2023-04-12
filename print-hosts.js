const hosts = require('./hosts.json');

console.log(`Hosts count: ${hosts.length}`);
console.log(`Hosts count with more than 1 feed: ${hosts.filter((host) => host.count > 1).length}`);
console.log(`Hosts count with more than 10 feeds: ${hosts.filter((host) => host.count > 10).length}`);
console.log(`Hosts count with more than 100 feeds: ${hosts.filter((host) => host.count > 100).length}`);
console.log(`Hosts count with more than 1000 feeds: ${hosts.filter((host) => host.count > 1000).length}`);

for(let i = 0; i < 20; i++) {
    console.log(`Host: ${hosts[i].host}, feeds count: ${hosts[i].count}`);
}
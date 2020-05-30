const fetch = require('node-fetch');

module.exports = (subreddit) => fetch(`https://reddit.com/r/${subreddit}.json`).then((res) => res.json());
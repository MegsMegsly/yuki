const { APIWrapper } = require('../structures')
const { google } = require('googleapis')

class Youtube extends APIWrapper {
  constructor (client) {
    super(client)
  }

  load () {
    this.Youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY
    })

    return this
  }

  searchVideos (query, part = 'snippet', maxResults = 5) {
    return this.search(query, ['video'], part, 'relevance', maxResults)
  }

  search (query, type = ['video', 'channel', 'playlist'], part = 'snippet', order = 'relevance', maxResults = 5) {
    return this.Youtube.search.list({ q: query, type: type.join(), part, order, maxResults }).then((response) => response.data)
  }
}

module.exports = Youtube

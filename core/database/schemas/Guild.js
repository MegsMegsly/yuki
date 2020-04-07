const { Schema, model } = require('mongoose');

module.exports = model('Guild', new Schema ({
	guildID: String,
	prefix: String
}));
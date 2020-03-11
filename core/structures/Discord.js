const { Client, Collection, MessageEmbed } = require('discord.js');

module.exports = class extends Client {
	constructor(config) {
		super({
			disableEveryone: true
		});

		this.commands = new Collection();
		this.aliases = new Collection();
		this.MessageEmbed = MessageEmbed;
		this.util = require('../util/Util.js');
	}
};
require('dotenv/config');

const { Client, Collection } =  require('discord.js');
const fs = require('fs');

const Yuki = new Client();

Yuki.commands = new Collection();
Yuki.aliases = new Collection();

Yuki.login(process.env.TOKEN);
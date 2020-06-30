const express = require('express');

const app = express();

module.exports = {
	load(Yuki) {
		this.initializeHTTP(Yuki);
	},

	initializeHTTP() {
		app.get('/', (req, res) => res.sendStatus(200));
    		app.listen(process.env.PORT);
	}
};
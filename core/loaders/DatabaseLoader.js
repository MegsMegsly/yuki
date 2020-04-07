const mongoose = require('mongoose');

module.exports = {
  load(Yuki) {
    this.initializeDatabase(Yuki);
  },

  initializeDatabase() {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    const MongoDB = mongoose.connection;

    MongoDB.on('open', () => console.log('Initialized database'));
    MongoDB.on('error', (error) => console.log(error.message));
  }
};
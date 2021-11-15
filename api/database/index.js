const mongoose = require('mongoose');
const { mongodb } = require('../config');

const connect = () => {
    console.log(`SETTING UP DATABASE CONNECTION TO: ${mongodb}`);
    mongoose.connect(mongodb);
}

module.exports = { connect };
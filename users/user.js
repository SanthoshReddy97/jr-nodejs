const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    address: String,
    paymentTranxId : String,
    paymentScreenshot: String
});

module.exports = mongoose.model('User', userSchema);


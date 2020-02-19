const mongoose = require('mongoose');

const mongodburi = "mongodb+srv://jr-users:jr-users@connecttoproject-u9eoi.mongodb.net/jr-users?retryWrites=true&w=majority"

const options = {
    promiseLibrary: require('bluebird'), useNewUrlParser: true, useUnifiedTopology: true 
};

mongoose.connect(mongodburi, options, (err) => {
    if (err) console.log(err)
    else console.log("mongodb connection successful")
});


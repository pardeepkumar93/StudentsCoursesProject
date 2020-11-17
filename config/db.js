const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(res => {
        console.log("Connected to db");
    }).catch(err => {
        console.log("error connecting db");
    })

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
module.exports = mongoose;

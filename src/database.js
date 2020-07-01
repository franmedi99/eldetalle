const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser:true,
    useCreateIndex:true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
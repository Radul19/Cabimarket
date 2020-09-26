// const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost/GoMap', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// })
//     .then(db => console.log('Database is connected'))
//     .catch(err => console.log(err))
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://radulito19:2219230Slyt@cluster0.6fy7c.mongodb.net/CabiMarket?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err))
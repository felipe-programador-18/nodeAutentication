const express= require('express')
const api = express()
const port = process.env.PORT || 3000

//create variable to receive bodyparser
const bodyparser = require('body-parser')


// create connect mongo and mongoose
const mongodb = process.env.MONGODB || 'mongodb://localhost/empresa'
const mongoose = require('mongoose')
mongoose.Promise = global.Promise


api.get('/', (req, res) => {
    res.send('let working and learning more and more')
})

mongoose.connect(mongodb, {useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(() => {
    api.listen(port, () => console.log('listing of port: ', port))
})
.catch(e => console.log(e))


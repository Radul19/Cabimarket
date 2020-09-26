const express = require('express')
const path = require('path')
const app = express()

//Settings
app.set('port', process.env.PORT || 3000)
app.set('views',path.join(__dirname,'views'))
app.set('view engine','pug')

//Middleware
app.use(express.urlencoded({ extended: false }))

//Routes
app.use(require('./src/routes/index.routes'))



//Static Files
app.use(express.static(path.join(__dirname,'public')))

module.exports = app
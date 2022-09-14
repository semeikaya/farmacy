const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.json())

app.use('/drugs', require('./routes/drugs.route'))
app.use('/users', require('./routes/users.route'))
app.use('/categories', require('./routes/categories.route'))

mongoose.connect(process.env.MONGO_SERVER, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('Успешно соединились с сервером MongoDB')
    
    app.listen(3000, () => {
        console.log('Сервер успешно запущен');
    });
})
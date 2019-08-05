const express = require('express');
const app=express();
const mongoose = require('mongoose');

const books = require('./routes/library/books');
const categories = require('./routes/library/categories');
const authors = require('./routes/library/authors');

mongoose.connect('mongodb://localhost/library')
    .then(()=>console.log('Connected to Database'))
    .catch((err)=> console.log('Error in Database Connection', err));

app.use(express.json());
app.use('/api/book', books);
app.use('/api/category', categories);
app.use('/api/author', authors);

const port = process.env.PORT || 4044;
app.listen(port, ()=>{console.log(`Listenning on ${port}`)});
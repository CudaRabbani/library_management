const express = require('express');
const app=express();
const mongoose = require('mongoose');
const config = require('config');

const books = require('./routes/library/books');
const categories = require('./routes/library/categories');
const authors = require('./routes/library/authors');
const userinfo = require('./routes/users/userInfo');
const users = require('./routes/users/users');
const bookstatus = require('./routes/library/bookStatus');
const rentals = require('./routes/rentals/rentals');
const auth = require('./routes/auth');

/*if (!config.get('jwtPrivateKey')) {
    console.error('Fatal error, jwt key is not set');
    process.exit(1);
}*/

mongoose.connect('mongodb://localhost/library')
    .then(()=>console.log('Connected to Database'))
    .catch((err)=> console.log('Error in Database Connection', err));

app.use(express.json());
app.use('/api/book', books);
app.use('/api/category', categories);
app.use('/api/author', authors);
app.use('/api/userinfo', userinfo);
app.use('/api/user', users);
app.use('/api/bookstatus', bookstatus);
app.use('/api/rentals', rentals);
app.use('/api/login', auth);

const port = process.env.PORT || 4044;
app.listen(port, ()=>{console.log(`Listenning on ${port}`)});
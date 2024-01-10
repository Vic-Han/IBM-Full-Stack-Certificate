const express = require('express');
const app = express();
const port = 3000;

// Middleware for books
const booksMiddleware = (req, res, next) => {
    // Middleware logic for books
    next();
};

// Middleware for users
const usersMiddleware = (req, res, next) => {
    // Middleware logic for users
    next();
};

booksMiddleware.get('/all', (req, res) => {

});
booksMiddleware.get('/isbn-lookup/:isbn', (req, res) => {

});
booksMiddleware.get('/author-lookup/', (req, res) => {

});
booksMiddleware.get('/book-review/:id', (req, res) => {

});
booksMiddleware.put('/edit-review/:user/:reviewid/:new-text', (req, res) => {

});
booksMiddleware.delete('/delete-review/:user/:reviewid', (req, res) => {

});
usersMiddleware.get('/register/:', (req, res) => {

});
usersMiddleware.get('/login/:username/:password', (req, res) => {

});
app.use('/books', booksMiddleware);
app.use('/users', usersMiddleware);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

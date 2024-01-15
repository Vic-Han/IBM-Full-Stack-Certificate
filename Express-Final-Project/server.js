const express = require('express');
const app = express();
const port = 3000;
const {bookList} = require('./books.js');
const {userList} = require('./users.js');
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

async function getBooks() {
    const books = await bookList;
    return books;
}
async function getBookByISBN(isbn) {    
    const books = await bookList;
    return books.find(book => book.isbn === isbn);
}
async function getBookByAuthor(author) {
    const books = await bookList;
    return books.filter(book => book.author === author);
}
async function getBookByTitle(title) {
    const books = await bookList;
    return books.find(book => book.title === title);
}
async function registerUser(username,password) {
    const users = await userList;
    return users.push({username: username, password: password});
}
async function loginUser(username,password) {
    const users = await userList;
    return users.find(user => user.username === username && user.password === password) !== undefined;
}
async function addReview(username, isbn, review) {
    const book = await getBookByISBN(isbn);
    book.reviews[username] = review;
    return true;
}
async function editReview(username, isbn, review) {
    const book = await getBookByISBN(isbn);
    book.reviews[username] = review;
    return true;
}
async function deleteReview(username, isbn) {
    const book = await getBookByISBN(isbn);
    delete book.reviews[username];
    return true;
}
booksMiddleware.get('/all', (req, res) => {
    getBooks().then((books) => {
        res.send(books);
    }); 
});
booksMiddleware.get('/isbn-lookup/:isbn', (req, res) => {
    const book = getBookByISBN(req.params.isbn);
    book.then((book) => {
        res.send(book);
    });
});
booksMiddleware.get('/author-lookup/', (req, res) => {
    const books = getBookByAuthor(req.query.author);
    books.then((books) => {
        res.send(books);
    });
});
booksMiddleware.get('/book-review/:isbn/:username', (req, res) => {
    const book = getBookByISBN(req.params.isbn);
    book.then((book) => {
        res.send(book.reviews[req.params.username]);
    });
});
booksMiddleware.put('/edit-review/:user/:isbn/:new-text', (req, res) => {
    editReview(req.params.user, req.params.isbn, req.params.new-text).then((edited) => {
            if(!edited) {  
                res.send({message: "Review not deleted"});
                return;
            }
            res.send({message: "Review edited successfully"});
        });
});
booksMiddleware.delete('/delete-review/:user/:isbn', (req, res) => {
    deleteReview(req.params.user, req.params.isbn).then((deleted) => {
        if(!deleted) {  
            res.send({message: "Review not deleted"});
            return;
        }
        res.send({message: "Review deleted successfully"});
    });
});
booksMiddleware.get('/lookup-title/:title', (req, res) => {
    const book = getBookByTitle(req.params.title);
    book.then((book) => {
        res.send(book);
    });
});
usersMiddleware.get('/register/:username/:password', (req, res) => {
    registerUser(req.params.username, req.params.password).then((user) => {
        res.send({message: "User registered successfully", user: user});
    });
});
usersMiddleware.get('/login/:username/:password', (req, res) => {
    loginUser(req.params.username, req.params.password).then((found) => {
        if(!found) {
            res.send({message: "User not found"});
        }
        else{
            res.send({message: "User logged in successfully"});
        }
    });
});

app.use('/books', booksMiddleware);
app.use('/users', usersMiddleware);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

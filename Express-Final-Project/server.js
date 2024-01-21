const express = require('express');
const app = express();
const port = 3000;
const {bookList} = require('./books.js');
const {userList} = require('./users.js');

async function getBooks() {
    const books = await bookList;
    return books;
}
async function getBookByISBN(isbn) {    
    const books = await bookList;
    for(let i = 0; i < books.length; i++) {
        if(books[i].isbn == isbn) {
            return books[i];
        }
    }
    return null;
}
async function getBookByAuthor(author) {
    const books = await bookList;
    for(let i = 0; i < books.length; i++) {
        if(books[i].author == author) {
            return books[i];
        }
    }
    return null;
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

async function editReview(username, isbn, review) {
    const books = await bookList;
    for(let i = 0; i < books.length; i++) {
        if(books[i].isbn == isbn) {
            books[i].reviews[username] = review;
            return true;
        }
    }
    return false;
}
async function deleteReview(username, isbn) {
    const books = await bookList;
    for(let i = 0; i < books.length; i++) {
        if(books[i].isbn == isbn) {
            delete books[i].reviews[username];
            return true;
        }
    }
    return false;
}
app.get('/allbooks', (req, res) => {
    getBooks().then((books) => {
        res.send(books);
    }); 
});
app.get('/isbn-lookup/:isbn', (req, res) => {
    const book = getBookByISBN(req.params.isbn);
    book.then((book) => {
        res.send(book);
    });
});
app.get('/author-lookup/:author', (req, res) => {
    const books = getBookByAuthor(req.params.author);
    books.then((books) => {
        res.send(books);
    });
});
app.get('/book-review/:isbn/:username', (req, res) => {
    const book = getBookByISBN(req.params.isbn);
    book.then((book) => {
        res.send({"review":book.reviews[req.params.username]});
    });
});
app.put('/edit-review/:user/:isbn/:nexttext', (req, res) => {
    editReview(req.params.user, req.params.isbn, req.params.newtext).then((edited) => {
            if(!edited) {  
                res.send({message: "Review not deleted"});
                return;
            }
            res.send({message: "Review edited successfully"});
        });
});
app.delete('/delete-review/:user/:isbn', (req, res) => {
    deleteReview(req.params.user, req.params.isbn).then((deleted) => {
        if(!deleted) {  
            res.send({message: "Review not deleted"});
            return;
        }
        res.send({message: "Review deleted successfully"});
    });
});
app.get('/lookup-title/:title', (req, res) => {
    const book = getBookByTitle(req.params.title);
    book.then((book) => {
        res.send(book);
    });
});
app.post('/register/:username/:password', (req, res) => {
    registerUser(req.params.username, req.params.password).then((user) => {
        res.send({message: "User registered successfully", user: user});
    });
});
app.get('/login/:username/:password', (req, res) => {
    loginUser(req.params.username, req.params.password).then((found) => {
        if(!found) {
            res.send({message: "User not found"});
        }
        else{
            res.send({message: "User logged in successfully"});
        }
    });
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

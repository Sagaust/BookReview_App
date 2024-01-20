const express = require('express');
const axios = require('axios');
const public_users = express.Router();

// Function to get the list of books using async-await
async function getBooksList() {
  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=Africa'); // Replace with actual URL
    return response.data;
  } catch (error) {
    console.error("Error fetching books list:", error);
    throw error;
  }
}

public_users.get('/', async (req, res) => {
  try {
    const booksList = await getBooksList();
    res.status(200).json(booksList);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books list" });
  }
});

// Get a book review by ISBN
public_users.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!book.reviews || Object.keys(book.reviews).length === 0) {
    return res.status(404).json({ message: "No reviews found for this book" });
  }

  return res.status(200).json(book.reviews);
})

// Function to get book details by ISBN using Promise callbacks
function getBookDetailsByISBN(isbn) {
  return axios.get(`URL_TO_GET_BOOK_BY_ISBN/${isbn}`) // Replace with actual URL
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching book by ISBN:", error);
      throw error;
    });
}

public_users.get('/isbn/:isbn', (req, res) => {
  getBookDetailsByISBN(req.params.isbn)
    .then(book => res.status(200).json(book))
    .catch(error => res.status(500).json({ message: "Error retrieving book" }));
});

// Async function to get book details by author
async function getBookDetailsByAuthor(author) {
  try {
    const response = await axios.get(`URL_TO_GET_BOOKS_BY_AUTHOR/${author}`); // Replace with actual URL
    return response.data;
  } catch (error) {
    console.error("Error fetching books by author:", error);
    throw error;
  }
}

public_users.get('/author/:author', async (req, res) => {
  try {
    const booksByAuthor = await getBookDetailsByAuthor(req.params.author);
    res.status(200).json(booksByAuthor);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books by author" });
  }
});

// Function to get book details by title using Promise callbacks
function getBookDetailsByTitle(title) {
  return axios.get(`URL_TO_GET_BOOKS_BY_TITLE/${title}`) // Replace with actual URL
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching books by title:", error);
      throw error;
    });
}

public_users.get('/title/:title', (req, res) => {
  getBookDetailsByTitle(req.params.title)
    .then(books => res.status(200).json(books))
    .catch(error => res.status(500).json({ message: "Error retrieving books by title" }));
});

module.exports.general = public_users;

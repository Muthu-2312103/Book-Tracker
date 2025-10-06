const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET all books
router.get('/', async (req, res) => {
  try {
    const { status, genre, sortBy = 'dateAdded', order = 'desc' } = req.query;
    
    let filter = {};
    if (status) filter.status = status;
    if (genre) filter.genre = new RegExp(genre, 'i');
    
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortOptions = { [sortBy]: sortOrder };
    
    const books = await Book.find(filter).sort(sortOptions);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new book
router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation Error', errors });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: 'ISBN already exists' });
    }
    res.status(500).json({ message: error.message });
  }
});

// PUT update a book
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation Error', errors });
    }
    res.status(500).json({ message: error.message });
  }
});

// PATCH update reading progress
router.patch('/:id/progress', async (req, res) => {
  try {
    const { currentPage } = req.body;
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    book.currentPage = currentPage;
    
    // Auto-update status if reading is completed
    if (book.pages && currentPage >= book.pages && book.status !== 'completed') {
      book.status = 'completed';
      book.dateCompleted = new Date();
    } else if (currentPage > 0 && book.status === 'want-to-read') {
      book.status = 'currently-reading';
      book.dateStarted = new Date();
    }
    
    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST add a note to a book
router.post('/:id/notes', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    book.notes.push({
      content: req.body.content,
      dateAdded: new Date()
    });
    
    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a book
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET reading statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const completedBooks = await Book.countDocuments({ status: 'completed' });
    const currentlyReading = await Book.countDocuments({ status: 'currently-reading' });
    const wantToRead = await Book.countDocuments({ status: 'want-to-read' });
    
    // Calculate average rating
    const ratedBooks = await Book.find({ rating: { $exists: true, $ne: null } });
    const averageRating = ratedBooks.length > 0 
      ? ratedBooks.reduce((sum, book) => sum + book.rating, 0) / ratedBooks.length 
      : 0;
    
    // Get most read genres
    const genreStats = await Book.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    res.json({
      totalBooks,
      completedBooks,
      currentlyReading,
      wantToRead,
      averageRating: Math.round(averageRating * 10) / 10,
      topGenres: genreStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
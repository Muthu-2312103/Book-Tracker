import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import BookCard from './components/BookCard';
import BookModal from './components/BookModal';
import FilterTabs from './components/FilterTabs';
import StatsCard from './components/StatsCard';
import EmptyState from './components/EmptyState';
import Toast from './components/Toast';
import api from './services/api';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchBooks();
    fetchStats();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [books, currentFilter]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await api.getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const filterBooks = () => {
    if (currentFilter === 'all') {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter(book => book.status === currentFilter));
    }
  };

  const handleAddBook = () => {
    setEditingBook(null);
    setShowModal(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowModal(true);
  };

  const handleSaveBook = async (bookData) => {
    try {
      if (editingBook) {
        await api.updateBook(editingBook._id, bookData);
      } else {
        await api.createBook(bookData);
      }
      fetchBooks();
      fetchStats();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await api.deleteBook(bookId);
      fetchBooks();
      fetchStats();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleUpdateProgress = async (bookId, currentPage) => {
    try {
      await api.updateProgress(bookId, currentPage);
      fetchBooks();
      fetchStats();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your books...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Toaster position="top-right" />
      <Header onAddBook={handleAddBook} />
      
      <main className="main-content">
        <div className="container">
          <StatsCard stats={stats} />
          
          <div className="books-section">
            <div className="section-header">
              <h2>My Books</h2>
              <FilterTabs 
                currentFilter={currentFilter} 
                onFilterChange={setCurrentFilter}
                books={books}
              />
            </div>
            
            {filteredBooks.length === 0 ? (
              <EmptyState 
                filter={currentFilter}
                onAddBook={handleAddBook}
              />
            ) : (
              <div className="books-grid">
                {filteredBooks.map(book => (
                  <BookCard
                    key={book._id}
                    book={book}
                    onEdit={handleEditBook}
                    onDelete={handleDeleteBook}
                    onUpdateProgress={handleUpdateProgress}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {showModal && (
        <BookModal
          book={editingBook}
          onSave={handleSaveBook}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default App;
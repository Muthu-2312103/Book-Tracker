import React, { useState, useEffect } from 'react';
import { FiX, FiStar } from 'react-icons/fi';

const BookModal = ({ book, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    status: 'want-to-read',
    rating: '',
    review: '',
    pages: '',
    currentPage: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        isbn: book.isbn || '',
        genre: book.genre || '',
        status: book.status || 'want-to-read',
        rating: book.rating || '',
        review: book.review || '',
        pages: book.pages || '',
        currentPage: book.currentPage || ''
      });
    }
  }, [book]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.genre.trim()) {
      newErrors.genre = 'Genre is required';
    }

    if (formData.rating && (formData.rating < 1 || formData.rating > 5)) {
      newErrors.rating = 'Rating must be between 1 and 5';
    }

    if (formData.pages && formData.pages < 1) {
      newErrors.pages = 'Pages must be at least 1';
    }

    if (formData.currentPage && formData.pages && 
        formData.currentPage > formData.pages) {
      newErrors.currentPage = 'Current page cannot exceed total pages';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const submitData = { ...formData };
      
      // Convert numeric fields
      if (submitData.rating) submitData.rating = Number(submitData.rating);
      if (submitData.pages) submitData.pages = Number(submitData.pages);
      if (submitData.currentPage) submitData.currentPage = Number(submitData.currentPage);
      
      // Remove empty fields
      Object.keys(submitData).forEach(key => {
        if (submitData[key] === '' || submitData[key] === null) {
          delete submitData[key];
        }
      });

      await onSave(submitData);
    } catch (error) {
      console.error('Error saving book:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating === prev.rating ? '' : rating
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {book ? 'Edit Book' : 'Add New Book'}
          </h2>
          <button className="modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`input ${errors.title ? 'error' : ''}`}
                placeholder="Enter book title"
              />
              {errors.title && <div className="form-error">{errors.title}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Author *</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className={`input ${errors.author ? 'error' : ''}`}
                placeholder="Enter author name"
              />
              {errors.author && <div className="form-error">{errors.author}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Genre *</label>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className={`input ${errors.genre ? 'error' : ''}`}
                placeholder="e.g., Fiction, Mystery, Biography"
              />
              {errors.genre && <div className="form-error">{errors.genre}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">ISBN</label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                className="input"
                placeholder="Enter ISBN (optional)"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input select"
              >
                <option value="want-to-read">Want to Read</option>
                <option value="currently-reading">Currently Reading</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Pages</label>
              <input
                type="number"
                name="pages"
                value={formData.pages}
                onChange={handleChange}
                className={`input ${errors.pages ? 'error' : ''}`}
                placeholder="Total pages"
                min="1"
              />
              {errors.pages && <div className="form-error">{errors.pages}</div>}
            </div>
          </div>

          {formData.status === 'currently-reading' && (
            <div className="form-group">
              <label className="form-label">Current Page</label>
              <input
                type="number"
                name="currentPage"
                value={formData.currentPage}
                onChange={handleChange}
                className={`input ${errors.currentPage ? 'error' : ''}`}
                placeholder="Pages read so far"
                min="0"
                max={formData.pages || undefined}
              />
              {errors.currentPage && <div className="form-error">{errors.currentPage}</div>}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Rating</label>
            <div className="rating-input">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  className={`star-button ${star <= formData.rating ? 'filled' : ''}`}
                  onClick={() => handleRatingClick(star)}
                >
                  <FiStar />
                </button>
              ))}
              {formData.rating && (
                <button
                  type="button"
                  className="clear-rating"
                  onClick={() => handleRatingClick('')}
                >
                  Clear
                </button>
              )}
            </div>
            {errors.rating && <div className="form-error">{errors.rating}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Review</label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleChange}
              className="input textarea"
              placeholder="Write your thoughts about this book..."
              rows="4"
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : (book ? 'Update Book' : 'Add Book')}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background-color: var(--surface);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 1.5rem 0;
          margin-bottom: 1.5rem;
        }

        .modal-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .modal-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border: none;
          border-radius: var(--radius);
          background-color: var(--border-light);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modal-close:hover {
          background-color: var(--border);
          color: var(--text-primary);
        }

        .modal-form {
          padding: 0 1.5rem 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .rating-input {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .star-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border: none;
          background: none;
          color: var(--border);
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .star-button:hover,
        .star-button.filled {
          color: var(--warning-color);
        }

        .star-button.filled svg {
          fill: currentColor;
        }

        .clear-rating {
          font-size: 0.75rem;
          color: var(--text-secondary);
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: underline;
        }

        .clear-rating:hover {
          color: var(--text-primary);
        }

        .modal-footer {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }

        .input.error {
          border-color: var(--danger-color);
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        @media (max-width: 768px) {
          .modal-content {
            margin: 0.5rem;
            max-height: calc(100vh - 1rem);
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .modal-footer {
            flex-direction: column-reverse;
          }

          .modal-footer .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default BookModal;
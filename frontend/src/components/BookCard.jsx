import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiStar, FiClock, FiCheckCircle, FiBookOpen } from 'react-icons/fi';
import { format } from 'date-fns';

const BookCard = ({ book, onEdit, onDelete, onUpdateProgress }) => {
  const [currentPage, setCurrentPage] = useState(book.currentPage || 0);
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'want-to-read':
        return <FiClock className="status-icon want-to-read" />;
      case 'currently-reading':
        return <FiBookOpen className="status-icon currently-reading" />;
      case 'completed':
        return <FiCheckCircle className="status-icon completed" />;
      default:
        return <FiClock className="status-icon" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'want-to-read':
        return 'Want to Read';
      case 'currently-reading':
        return 'Currently Reading';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const handleProgressUpdate = async () => {
    if (currentPage === book.currentPage) return;
    
    setIsUpdatingProgress(true);
    try {
      await onUpdateProgress(book._id, currentPage);
    } catch (error) {
      console.error('Error updating progress:', error);
    } finally {
      setIsUpdatingProgress(false);
    }
  };

  const renderRating = () => {
    if (!book.rating) return null;
    
    return (
      <div className="rating">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`star ${i < book.rating ? 'filled' : ''}`}
          />
        ))}
      </div>
    );
  };

  const readingProgress = book.pages ? Math.round((currentPage / book.pages) * 100) : 0;

  return (
    <div className="book-card">
      <div className="book-header">
        <div className="book-status">
          {getStatusIcon(book.status)}
          <span className="status-text">{getStatusText(book.status)}</span>
        </div>
        
        <div className="book-actions">
          <button 
            className="btn-icon"
            onClick={() => onEdit(book)}
            title="Edit book"
          >
            <FiEdit2 />
          </button>
          <button 
            className="btn-icon btn-danger"
            onClick={() => onDelete(book._id)}
            title="Delete book"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      <div className="book-content">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        
        {book.genre && (
          <span className="book-genre">{book.genre}</span>
        )}

        {renderRating()}

        {book.pages && (
          <div className="progress-section">
            <div className="progress-info">
              <span className="progress-text">
                {currentPage} / {book.pages} pages
              </span>
              <span className="progress-percentage">
                {readingProgress}%
              </span>
            </div>
            
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${readingProgress}%` }}
              />
            </div>

            {book.status === 'currently-reading' && (
              <div className="progress-update">
                <input
                  type="number"
                  min="0"
                  max={book.pages}
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="progress-input"
                  placeholder="Current page"
                />
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handleProgressUpdate}
                  disabled={isUpdatingProgress || currentPage === book.currentPage}
                >
                  {isUpdatingProgress ? 'Updating...' : 'Update'}
                </button>
              </div>
            )}
          </div>
        )}

        {book.review && (
          <p className="book-review">{book.review}</p>
        )}

        <div className="book-footer">
          <span className="book-date">
            Added {format(new Date(book.dateAdded), 'MMM dd, yyyy')}
          </span>
        </div>
      </div>

      <style jsx>{`
        .book-card {
          background-color: var(--surface);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .book-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .book-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .book-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-icon {
          width: 1rem;
          height: 1rem;
        }

        .status-icon.want-to-read {
          color: var(--warning-color);
        }

        .status-icon.currently-reading {
          color: var(--primary-color);
        }

        .status-icon.completed {
          color: var(--success-color);
        }

        .status-text {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .book-actions {
          display: flex;
          gap: 0.5rem;
        }

        .btn-icon {
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

        .btn-icon:hover {
          background-color: var(--border);
          color: var(--text-primary);
        }

        .btn-icon.btn-danger:hover {
          background-color: var(--danger-color);
          color: white;
        }

        .book-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
          line-height: 1.4;
        }

        .book-author {
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
        }

        .book-genre {
          display: inline-block;
          background-color: var(--primary-color);
          color: white;
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          margin-bottom: 0.75rem;
        }

        .rating {
          display: flex;
          gap: 0.125rem;
          margin-bottom: 0.75rem;
        }

        .star {
          width: 1rem;
          height: 1rem;
          color: var(--border);
        }

        .star.filled {
          color: var(--warning-color);
          fill: currentColor;
        }

        .progress-section {
          margin-bottom: 0.75rem;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .progress-text {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .progress-percentage {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--primary-color);
        }

        .progress-bar {
          width: 100%;
          height: 0.25rem;
          background-color: var(--border-light);
          border-radius: 9999px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill {
          height: 100%;
          background-color: var(--primary-color);
          transition: width 0.3s ease;
        }

        .progress-update {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .progress-input {
          flex: 1;
          padding: 0.25rem 0.5rem;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          font-size: 0.75rem;
        }

        .book-review {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .book-footer {
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-light);
        }

        .book-date {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};

export default BookCard;
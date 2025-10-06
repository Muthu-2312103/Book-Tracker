import React from 'react';
import { FiBook, FiPlus } from 'react-icons/fi';

const EmptyState = ({ filter, onAddBook }) => {
  const getEmptyMessage = () => {
    switch (filter) {
      case 'want-to-read':
        return {
          title: 'No books in your reading list',
          description: 'Add books you want to read to keep track of your future reads.'
        };
      case 'currently-reading':
        return {
          title: 'Not currently reading anything',
          description: 'Start reading a book from your list or add a new one.'
        };
      case 'completed':
        return {
          title: 'No completed books yet',
          description: 'Mark books as completed when you finish reading them.'
        };
      default:
        return {
          title: 'Your library is empty',
          description: 'Start building your personal book collection by adding your first book.'
        };
    }
  };

  const { title, description } = getEmptyMessage();

  return (
    <div className="empty-state">
      <div className="empty-icon">
        <FiBook />
      </div>
      
      <h3 className="empty-title">{title}</h3>
      <p className="empty-description">{description}</p>
      
      {filter === 'all' && (
        <button className="btn btn-primary btn-lg" onClick={onAddBook}>
          <FiPlus />
          Add Your First Book
        </button>
      )}

      <style jsx>{`
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 4rem 2rem;
          background-color: var(--surface);
          border-radius: var(--radius-lg);
          border: 2px dashed var(--border);
        }

        .empty-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 4rem;
          height: 4rem;
          background-color: var(--border-light);
          border-radius: 50%;
          color: var(--text-muted);
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }

        .empty-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .empty-description {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          max-width: 24rem;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .empty-state {
            padding: 3rem 1.5rem;
          }

          .empty-icon {
            width: 3rem;
            height: 3rem;
            font-size: 1.5rem;
            margin-bottom: 1rem;
          }

          .empty-title {
            font-size: 1.125rem;
          }

          .empty-description {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EmptyState;
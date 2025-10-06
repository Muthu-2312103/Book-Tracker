import React from 'react';
import { FiPlus, FiBook } from 'react-icons/fi';

const Header = ({ onAddBook }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-brand">
            <FiBook className="brand-icon" />
            <h1 className="brand-title">Book Tracker</h1>
          </div>
          
          <button 
            className="btn btn-secondary btn-lg header-btn"
            onClick={onAddBook}
          >
            <FiPlus />
            Add Book
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .header {
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
        }
        
        .header-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .brand-icon {
          width: 2rem;
          height: 2rem;
          color: white;
        }
        
        .brand-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }
        
        .header-btn {
          background-color: white;
          color: var(--primary-color);
          border: 2px solid white;
          font-weight: 600;
        }
        
        .header-btn:hover {
          background-color: rgba(255, 255, 255, 0.9);
          color: var(--primary-dark);
          transform: translateY(-1px);
        }
        
        @media (max-width: 768px) {
          .brand-title {
            font-size: 1.25rem;
          }
          
          .brand-icon {
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
import React from 'react';

const FilterTabs = ({ currentFilter, onFilterChange, books }) => {
  const filters = [
    { key: 'all', label: 'All Books' },
    { key: 'want-to-read', label: 'Want to Read' },
    { key: 'currently-reading', label: 'Currently Reading' },
    { key: 'completed', label: 'Completed' }
  ];

  const getCount = (filter) => {
    if (filter === 'all') return books.length;
    return books.filter(book => book.status === filter).length;
  };

  return (
    <div className="filter-tabs">
      {filters.map(filter => (
        <button
          key={filter.key}
          className={`filter-tab ${currentFilter === filter.key ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.key)}
        >
          <span className="filter-label">{filter.label}</span>
          <span className="filter-count">{getCount(filter.key)}</span>
        </button>
      ))}

      <style jsx>{`
        .filter-tabs {
          display: flex;
          gap: 0.25rem;
          background-color: var(--border-light);
          padding: 0.25rem;
          border-radius: var(--radius-lg);
          overflow-x: auto;
        }

        .filter-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border: none;
          border-radius: var(--radius);
          background-color: transparent;
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .filter-tab:hover {
          background-color: var(--surface);
          color: var(--text-primary);
        }

        .filter-tab.active {
          background-color: var(--surface);
          color: var(--primary-color);
          box-shadow: var(--shadow);
        }

        .filter-label {
          font-weight: 500;
        }

        .filter-count {
          background-color: var(--border);
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.125rem 0.375rem;
          border-radius: 9999px;
          min-width: 1.25rem;
          text-align: center;
        }

        .filter-tab.active .filter-count {
          background-color: var(--primary-color);
          color: white;
        }

        @media (max-width: 768px) {
          .filter-tabs {
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .filter-tabs::-webkit-scrollbar {
            display: none;
          }

          .filter-tab {
            padding: 0.5rem 0.75rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FilterTabs;
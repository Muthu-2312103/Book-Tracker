import React from 'react';
import { FiBook, FiBookOpen, FiCheckCircle, FiClock, FiStar, FiTrendingUp } from 'react-icons/fi';

const StatsCard = ({ stats }) => {
  const {
    totalBooks = 0,
    completedBooks = 0,
    currentlyReading = 0,
    wantToRead = 0,
    averageRating = 0,
    topGenres = []
  } = stats;

  const statItems = [
    {
      label: 'Total Books',
      value: totalBooks,
      icon: FiBook,
      color: 'var(--primary-color)'
    },
    {
      label: 'Completed',
      value: completedBooks,
      icon: FiCheckCircle,
      color: 'var(--success-color)'
    },
    {
      label: 'Reading',
      value: currentlyReading,
      icon: FiBookOpen,
      color: 'var(--secondary-color)'
    },
    {
      label: 'Want to Read',
      value: wantToRead,
      icon: FiClock,
      color: 'var(--warning-color)'
    }
  ];

  return (
    <div className="stats-container">
      <div className="stats-grid">
        {statItems.map((item, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ color: item.color }}>
              <item.icon />
            </div>
            <div className="stat-content">
              <div className="stat-value">{item.value}</div>
              <div className="stat-label">{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      {(averageRating > 0 || topGenres.length > 0) && (
        <div className="additional-stats">
          {averageRating > 0 && (
            <div className="rating-stat">
              <FiStar className="rating-icon" />
              <span className="rating-value">{averageRating}</span>
              <span className="rating-label">Average Rating</span>
            </div>
          )}

          {topGenres.length > 0 && (
            <div className="genres-stat">
              <FiTrendingUp className="genres-icon" />
              <div className="genres-content">
                <div className="genres-label">Top Genres</div>
                <div className="genres-list">
                  {topGenres.slice(0, 3).map((genre, index) => (
                    <span key={index} className="genre-tag">
                      {genre._id} ({genre.count})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .stats-container {
          margin-bottom: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .stat-card {
          background-color: var(--surface);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: transform 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-1px);
        }

        .stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          background-color: rgba(59, 130, 246, 0.1);
          border-radius: var(--radius-lg);
          font-size: 1.5rem;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .additional-stats {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .rating-stat {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--surface);
          border-radius: var(--radius-lg);
          padding: 1rem 1.5rem;
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
        }

        .rating-icon {
          color: var(--warning-color);
          font-size: 1.25rem;
        }

        .rating-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .rating-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .genres-stat {
          display: flex;
          align-items: center;
          gap: 1rem;
          background-color: var(--surface);
          border-radius: var(--radius-lg);
          padding: 1rem 1.5rem;
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
          flex: 1;
          min-width: 250px;
        }

        .genres-icon {
          color: var(--secondary-color);
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .genres-content {
          flex: 1;
        }

        .genres-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .genres-list {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .genre-tag {
          background-color: var(--border-light);
          color: var(--text-primary);
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }

          .stat-card {
            padding: 1rem;
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
          }

          .stat-icon {
            width: 2.5rem;
            height: 2.5rem;
            font-size: 1.25rem;
          }

          .stat-value {
            font-size: 1.5rem;
          }

          .additional-stats {
            flex-direction: column;
          }

          .genres-stat {
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default StatsCard;
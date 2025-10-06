import React from 'react';
import { FiCheckCircle, FiAlertCircle, FiX, FiInfo } from 'react-icons/fi';

const Toast = ({ type = 'info', message, onClose, autoClose = true }) => {
  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle />;
      case 'error':
        return <FiAlertCircle />;
      case 'warning':
        return <FiAlertCircle />;
      default:
        return <FiInfo />;
    }
  };

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">
        {getIcon()}
      </div>
      
      <div className="toast-message">
        {message}
      </div>
      
      <button className="toast-close" onClick={onClose}>
        <FiX />
      </button>

      <style jsx>{`
        .toast {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background-color: var(--surface);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border);
          min-width: 300px;
          max-width: 500px;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .toast-success {
          border-left: 4px solid var(--success-color);
        }

        .toast-error {
          border-left: 4px solid var(--danger-color);
        }

        .toast-warning {
          border-left: 4px solid var(--warning-color);
        }

        .toast-info {
          border-left: 4px solid var(--primary-color);
        }

        .toast-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 1.25rem;
        }

        .toast-success .toast-icon {
          color: var(--success-color);
        }

        .toast-error .toast-icon {
          color: var(--danger-color);
        }

        .toast-warning .toast-icon {
          color: var(--warning-color);
        }

        .toast-info .toast-icon {
          color: var(--primary-color);
        }

        .toast-message {
          flex: 1;
          font-size: 0.875rem;
          color: var(--text-primary);
          line-height: 1.5;
        }

        .toast-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.5rem;
          height: 1.5rem;
          border: none;
          background: none;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: var(--radius);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .toast-close:hover {
          background-color: var(--border-light);
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
};

export default Toast;
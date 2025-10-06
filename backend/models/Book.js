const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    maxlength: [100, 'Author name cannot exceed 100 characters']
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true,
    validate: {
      validator: function(v) {
        return !v || /^(?:\d{9}[\dX]|\d{13})$/.test(v.replace(/-/g, ''));
      },
      message: 'Invalid ISBN format'
    }
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['want-to-read', 'currently-reading', 'completed'],
    default: 'want-to-read'
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    validate: {
      validator: Number.isInteger,
      message: 'Rating must be a whole number'
    }
  },
  review: {
    type: String,
    maxlength: [1000, 'Review cannot exceed 1000 characters']
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  dateStarted: {
    type: Date
  },
  dateCompleted: {
    type: Date
  },
  pages: {
    type: Number,
    min: [1, 'Pages must be at least 1']
  },
  currentPage: {
    type: Number,
    min: [0, 'Current page cannot be negative'],
    default: 0
  },
  notes: [{
    content: String,
    dateAdded: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Virtual for reading progress
bookSchema.virtual('readingProgress').get(function() {
  if (!this.pages || this.pages === 0) return 0;
  return Math.round((this.currentPage / this.pages) * 100);
});

// Middleware to set dates based on status changes
bookSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    const now = new Date();
    
    if (this.status === 'currently-reading' && !this.dateStarted) {
      this.dateStarted = now;
    } else if (this.status === 'completed') {
      if (!this.dateStarted) {
        this.dateStarted = this.dateAdded || now;
      }
      if (!this.dateCompleted) {
        this.dateCompleted = now;
      }
      if (this.pages && !this.currentPage) {
        this.currentPage = this.pages;
      }
    }
  }
  next();
});

module.exports = mongoose.model('Book', bookSchema);
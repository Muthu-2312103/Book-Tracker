# Book Tracker

A full-stack web application for tracking your personal book collection, reading progress, and reviews. Built with React frontend and Node.js backend.

## Features

### Core Functionality
- **Book Management**: Add, edit, and delete books from your collection
- **Reading Status Tracking**: Organize books by status (Want to Read, Currently Reading, Completed)
- **Progress Tracking**: Track reading progress for books you're currently reading
- **Ratings & Reviews**: Rate books (1-5 stars) and write detailed reviews
- **Reading Statistics**: View comprehensive stats about your reading habits

### Book Information
- Title, Author, Genre, ISBN
- Page count and current page tracking
- Cover image support
- Personal notes and reviews
- Reading dates (started, completed)

### User Interface
- Clean, modern design with responsive layout
- Interactive filtering by reading status
- Visual progress bars for current reads
- Rating system with star interface
- Dashboard with reading statistics

## Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Icons** - Icon library
- **React Hot Toast** - Toast notifications
- **Date-fns** - Date formatting utilities

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Project Structure

```
book_tracker/
├── backend/
│   ├── models/
│   │   └── Book.js          # Book data model
│   ├── routes/
│   │   └── books.js         # Book API routes
│   ├── .env                 # Environment variables
│   ├── package.json         # Backend dependencies
│   └── server.js            # Express server setup
├── frontend/
│   ├── public/
│   │   └── index.html       # HTML template
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Header.jsx
│   │   │   ├── BookCard.jsx
│   │   │   ├── BookModal.jsx
│   │   │   ├── FilterTabs.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   └── Toast.jsx
│   │   ├── services/
│   │   │   └── api.js        # API service layer
│   │   ├── App.jsx          # Main app component
│   │   ├── App.css          # App-specific styles
│   │   ├── index.css        # Global styles
│   │   └── main.jsx         # React entry point
│   ├── eslint.config.js     # ESLint configuration
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
└── README.md               # Project documentation
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Copy the .env file and update values
   cp .env.example .env
   ```
   
   Update the `.env` file with your MongoDB connection string:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/booktracker
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

4. Start the backend server:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

### Database Setup

The application will automatically create the necessary database collections when you start adding books. Make sure MongoDB is running on your system or update the connection string to point to your MongoDB Atlas cluster.

## API Endpoints

### Books
- `GET /api/books` - Get all books (with optional filtering)
- `GET /api/books/:id` - Get a specific book
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book
- `PATCH /api/books/:id/progress` - Update reading progress
- `POST /api/books/:id/notes` - Add a note to a book
- `GET /api/books/stats/summary` - Get reading statistics

## Usage

### Adding a Book
1. Click the "Add Book" button in the header
2. Fill in the book details (title, author, and genre are required)
3. Set the reading status and other optional information
4. Click "Add Book" to save

### Tracking Progress
1. For books marked as "Currently Reading", use the progress input in the book card
2. Enter the current page number and click "Update"
3. The progress bar will automatically update
4. Books are automatically marked as "Completed" when you reach the final page

### Managing Your Library
- Use the filter tabs to view books by status
- Edit book details by clicking the edit icon on any book card
- Delete books using the trash icon
- View your reading statistics in the dashboard

## Development

### Available Scripts

#### Backend
- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Structure

The application follows a modular architecture:
- **Backend**: RESTful API with Express.js and MongoDB
- **Frontend**: Component-based React application with modern hooks
- **State Management**: Local state with React hooks
- **Styling**: CSS-in-JS with custom CSS variables for theming
- **API Communication**: Axios with interceptors for error handling

## Features in Detail

### Book Model
Each book contains:
- Basic information (title, author, genre, ISBN)
- Reading status and progress tracking
- Rating system (1-5 stars)
- Personal review and notes
- Timestamps for tracking reading history
- Cover image support

### Reading Statistics
The dashboard provides insights into your reading habits:
- Total books in your library
- Books completed, currently reading, and want to read
- Average rating across all rated books
- Most popular genres in your collection

### Responsive Design
The application is fully responsive and works well on:
- Desktop computers
- Tablets
- Mobile phones

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

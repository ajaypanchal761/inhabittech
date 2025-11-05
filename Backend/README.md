# InHabitTech Admin Panel Backend API

Backend API server for InHabitTech Admin Panel built with Node.js and Express.

## Features

- RESTful API architecture
- MongoDB database integration
- JWT authentication for admin
- Error handling middleware
- Request validation
- Security headers (Helmet)
- CORS support
- Request logging (Morgan)

## Project Structure

```
backend/
├── server.js                 # Entry point
├── package.json              # Dependencies
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
└── src/
    ├── config/              # Configuration files
    │   └── database.js      # Database connection
    ├── controllers/         # Request handlers
    │   └── (admin controllers)
    ├── middleware/          # Custom middleware
    │   ├── auth.js          # Admin authentication middleware
    │   ├── errorHandler.js  # Error handling
    │   └── validate.js     # Request validation
    ├── models/              # Database models
    │   └── (admin models)
    ├── routes/              # API routes
    │   ├── index.js         # Main router
    │   └── (admin routes)
    └── utils/               # Utility functions
        ├── logger.js
        └── response.js
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
   - Set your MongoDB connection string
   - Set a secure JWT secret key
   - Configure other environment variables as needed

4. Start the development server:
```bash
npm run dev
```

5. Start the production server:
```bash
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Base API
- `GET /api` - API information

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRE` - JWT token expiration time
- `CORS_ORIGIN` - Allowed CORS origin

## Development

The server uses nodemon for automatic restarts during development. Make sure to have MongoDB running locally or use a cloud MongoDB service like MongoDB Atlas.

## License

ISC


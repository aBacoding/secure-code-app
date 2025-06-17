# Secure Code App

A full-stack application focused on secure coding practices and vulnerability management.

## Overview

The Secure Code App is a modern web application built with a secure-by-design approach, featuring a React-based frontend and a robust Node.js backend.

## Project Structure

```
secure-code-app/
├── client/          # Frontend React application
│   ├── src/         # Source code
│   ├── public/      # Static files
│   └── package.json # Frontend dependencies
└── server/          # Backend Node.js application
    ├── src/         # Source code
    └── package.json # Backend dependencies
```

## Client (Frontend)

### Technologies Used

- React.js
- React Router
- TypeScript
- Tailwind CSS
- Axios
- Tanstack Query
- Zustand
- Shadcn UI

### Setup and Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The client will be available at `http://localhost:3000`

## Server (Backend)

### Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB
- JWT for authentication
- bcrypt for password hashing

### Setup and Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

The server will be available at `http://localhost:5000`

## Environment Variables

### Client

Create a `.env` file in the client directory with:

```
VITE_API_URL=http://localhost:5000
```

### Server

Create a `.env` file in the server directory with:

```
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/secure_code_db
JWT_SECRET=your_jwt_secret
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Rate limiting
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### User Endpoints

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - See LICENSE file for details

## Support

For support, please open an issue in the repository or contact the development team.

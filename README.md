# TODO Application

A full-stack TODO application built with React frontend and Node.js backend.

## Project Structure

```
TODO/
├── Client/          # React frontend (Vite)
├── Server/          # Node.js backend (Express + MongoDB)
├── package.json     # Root package.json for running both
└── README.md        # This file
```

## Quick Start

### First Time Setup

1. Install all dependencies (root, server, and client):
   ```bash
   npm run install-all
   ```

### Running the Application

To run both client and server simultaneously with a single command:

```bash
npm run dev
```

This will start:
- **Client**: React development server (typically on http://localhost:5173)
- **Server**: Node.js backend server (typically on http://localhost:3000)

### Individual Commands

If you need to run them separately:

- **Client only**: `npm run client`
- **Server only**: `npm run server`
- **Build client**: `npm run build`

## Available Scripts

- `npm run dev` - Start both client and server in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend development server
- `npm run install-all` - Install dependencies for all parts of the application
- `npm run build` - Build the React application for production

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Development**: Concurrently (for running multiple commands) 
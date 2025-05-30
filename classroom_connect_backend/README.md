# Classroom Connect Backend

This is a minimal Node.js/Express server for Classroom Connect. It exposes endpoints to create classrooms and verify classroom codes (in-memory only).

## Setup

```bash
npm install
```

## Start the server

```bash
# Production / single-run
npm start

# OR (recommended for development, with live reload)
npm run dev
```

Server will listen on port 4555 by default. You can change the port via the `PORT` environment variable.

## API Endpoints

- `POST /classrooms`: Create a classroom.
    - Body: `{ code: "ABC123", members: 25 }`
    - Response: `{ success: true, classroom: { code, members, createdAt } }`
    - Fails if code exists.

- `GET /classrooms/:code`: Check classroom existence.
    - Response: `{ classroom: { code, members, createdAt } }`
    - 404 if not found.

- `GET /`: Health check.

This backend stores classrooms in-memory only (resets upon server restart).

'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4555;

/**
 * ===================================================================================
 * In-memory storage for classroom records.
 * Keyed by code (6 uppercase letters/digits): {
 *    code: string,
 *    members: number,
 *    createdAt: number (timestamp)
 * }
 * ===================================================================================
 */
const classrooms = {};

app.use(cors());
app.use(express.json());

/* ===========================================================================
 * API ENDPOINTS for CLASSROOM CONNECT BACKEND
 * ===========================================================================
 *
 * This backend is intended for lightweight classroom creation and code verification.
 * It is stateful only in memory (data will be lost if restarted). No auth required.
 * 
 * All responses are JSON. All endpoints support CORS.
 *
 * ┌─────────────────────────────────────────────┐
 * │    POST /classrooms                        │
 * └─────────────────────────────────────────────┘
 *   ● Create a new classroom code with member limit
 *   ● Body:   { code: "ABC123", members: 25 }
 *   ● Success: { success: true, classroom: { code, members, createdAt } }
 *   ● Failure: 400 (bad code/params) | 409 (already exists)
 * 
 * ┌─────────────────────────────────────────────┐
 * │    GET /classrooms/:code                   │
 * └─────────────────────────────────────────────┘
 *   ● Check if a classroom code exists
 *   ● Response:  { classroom: { code, members, createdAt } }
 *   ● 404 if not found, 400 if malformed code
 *
 * ┌─────────────────────────────────────────────┐
 * │    GET /                                   │
 * └─────────────────────────────────────────────┘
 *   ● Health check endpoint. Returns { status: "ok", ... }
 */

/**
 * PUBLIC_INTERFACE
 *
 * Create a classroom with a 6-character code and a members limit.
 * - POST /classrooms
 * - Body: { code: string, members: number }
 *   - code: 6 uppercase letters or digits, unique
 *   - members: integer 1–200
 * - Response:
 *   - 201: { success: true, classroom: { code, members, createdAt } }
 *   - 400: invalid input
 *   - 409: code already exists
 */
app.post('/classrooms', (req, res) => {
  const { code, members } = req.body;
  if (
    typeof code !== 'string' ||
    code.length !== 6 ||
    !/^[A-Z0-9]{6}$/.test(code)
  ) {
    return res.status(400).json({ error: 'Invalid classroom code. Must be 6 uppercase letters/digits.' });
  }
  if (
    typeof members !== 'number' ||
    !Number.isFinite(members) ||
    members < 1 ||
    members > 200
  ) {
    return res.status(400).json({ error: 'Invalid members count (1-200 required).' });
  }
  if (classrooms[code]) {
    return res.status(409).json({ error: 'Classroom code already exists.' });
  }
  classrooms[code] = {
    code,
    members,
    createdAt: Date.now()
  };
  res.status(201).json({ success: true, classroom: classrooms[code] });
});

/**
 * PUBLIC_INTERFACE
 * 
 * Check existence/details of a classroom by code.
 * - GET /classrooms/:code
 * - Response:
 *    - 200: { classroom }
 *    - 404: if code not found
 *    - 400: if code format invalid
 */
app.get('/classrooms/:code', (req, res) => {
  const { code } = req.params;
  if (
    typeof code !== 'string' ||
    code.length !== 6 ||
    !/^[A-Z0-9]{6}$/.test(code)
  ) {
    return res.status(400).json({ error: 'Invalid classroom code. Must be 6 uppercase letters/digits.' });
  }
  const classroom = classrooms[code];
  if (!classroom) {
    return res.status(404).json({ error: 'Classroom not found.' });
  }
  res.json({ classroom });
});

/**
 * PUBLIC_INTERFACE
 *
 * Health check endpoint for server status.
 * - GET /
 * - Returns: { status: "ok", msg: ... }
 */
app.get('/', (req, res) => {
  res.json({ status: 'ok', msg: 'Classroom Connect backend running.' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Classroom Connect backend listening on port ${PORT}`);
});

// =============================================================================
// Backend API ready for integration: POST /classrooms and GET /classrooms/:code
// =============================================================================

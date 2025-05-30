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

// Helper: Normalize classroom code to uppercase
function normalizeCode(code) {
  return typeof code === 'string' ? code.toUpperCase() : '';
}

app.use(cors());
app.use(express.json());

// ===========================================================================
// API ENDPOINTS for CLASSROOM CONNECT BACKEND
// ===========================================================================

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
  let { code, members } = req.body;
  code = normalizeCode(code);

  // Validate code
  if (
    typeof code !== 'string' ||
    code.length !== 6 ||
    !/^[A-Z0-9]{6}$/.test(code)
  ) {
    return res.status(400).json({ error: 'Invalid classroom code. Must be 6 uppercase letters/digits.' });
  }

  // Validate members
  if (
    typeof members !== 'number' ||
    !Number.isInteger(members) ||
    members < 1 ||
    members > 200
  ) {
    return res.status(400).json({ error: 'Invalid members count (1-200, integer, required).' });
  }

  // Classroom code uniqueness
  if (classrooms[code]) {
    return res.status(409).json({ error: 'Classroom code already exists.' });
  }

  // Create classroom in store
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
  let code = normalizeCode(req.params.code);

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

// Fallback for unsupported routes
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Classroom Connect backend listening on port ${PORT}`);
});

// =============================================================================
// Backend API ready for integration: POST /classrooms and GET /classrooms/:code
// =============================================================================

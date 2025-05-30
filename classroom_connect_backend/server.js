'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4555;

// ===================================================================================
// In-memory storage for classroom data
// Structure: { [classroomCode: string]: { code, members, createdAt } }
// ===================================================================================
const classrooms = {};

// Helper: Normalize classroom code to uppercase (A-Z0-9, len=6)
function normalizeCode(code) {
  return typeof code === 'string' ? code.toUpperCase() : '';
}

// Helper: Log errors with stack if possible (to stderr)
function logError(err, req = null) {
  if (process.env.NODE_ENV !== 'test') {
    // Log error + endpoint context
    // eslint-disable-next-line no-console
    console.error(
      `[${new Date().toISOString()}] ${req ? req.method + ' ' + req.originalUrl + ' - ' : ''}Error:`,
      err && err.stack ? err.stack : err
    );
  }
}

// CORS Configuration: In dev, allow all origins; lock down as needed in production
app.use(cors());
// Parse JSON body, catch JSON parsing errors
app.use(express.json());

// Catch JSON syntax errors (malformed requests)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    logError(err, req);
    return res.status(400).json({ error: 'Malformed JSON payload.' });
  }
  next(err);
});

// PUBLIC_INTERFACE
/**
 * POST /classrooms
 * Create a classroom with a code and number of members.
 * Expects: { code: string, members: number }
 * Returns: { success: boolean, classroom: { code, members, createdAt } } or error
 */
app.post('/classrooms', (req, res) => {
  try {
    let { code, members } = req.body;
    code = normalizeCode(code);

    // Validate classroom code
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
      return res.status(400).json({ error: 'Invalid members count (integer between 1-200).' });
    }

    // Check for duplicate code
    if (classrooms[code]) {
      return res.status(409).json({ error: 'Classroom code already exists.' });
    }

    // Create classroom record
    classrooms[code] = {
      code,
      members,
      createdAt: Date.now()
    };
    res.status(201).json({ success: true, classroom: classrooms[code] });
  } catch (err) {
    logError(err, req);
    res.status(500).json({ error: 'Internal server error while creating classroom.' });
  }
});

// PUBLIC_INTERFACE
/**
 * GET /classrooms/:code
 * Verify a classroom exists for a given code.
 * Returns: { classroom } or 404 if not found
 */
app.get('/classrooms/:code', (req, res) => {
  try {
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
  } catch (err) {
    logError(err, req);
    res.status(500).json({ error: 'Internal server error while verifying classroom.' });
  }
});

// PUBLIC_INTERFACE
/**
 * GET /
 * Health check endpoint
 */
app.get('/', (req, res) => {
  res.json({ status: 'ok', msg: 'Classroom Connect backend running.' });
});

// Fallback for unsupported routes (404 for everything else)
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

// Express global error handler (with stack logging)
app.use((err, req, res, next) => {
  logError(err, req);
  res.status(500).json({ error: 'Unhandled server error.' });
});

// Start server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Classroom Connect backend listening on port ${PORT}`);
});

// =============================================================================
// Backend API ready for integration: POST /classrooms and GET /classrooms/:code
// =============================================================================

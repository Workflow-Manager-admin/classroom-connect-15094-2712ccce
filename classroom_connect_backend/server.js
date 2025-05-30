'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4555;

// In-memory storage for classroom data
// Structure: { [classroomCode: string]: { code, members, createdAt } }
const classrooms = {};

app.use(cors());
app.use(express.json());

// PUBLIC_INTERFACE
/**
 * POST /classrooms
 * Create a classroom with a code and number of members.
 * Expects: { code: string, members: number }
 * Returns: { success: boolean, classroom: { code, members } } or error
 */
app.post('/classrooms', (req, res) => {
  const { code, members } = req.body;
  if (
    typeof code !== 'string' ||
    code.length !== 6 ||
    !/^[A-Z0-9]{6}$/.test(code)
  ) {
    return res.status(400).json({ error: 'Invalid classroom code.' });
  }
  if (
    typeof members !== 'number' ||
    !Number.isFinite(members) ||
    members < 1 ||
    members > 200
  ) {
    return res.status(400).json({ error: 'Invalid members count.' });
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

// PUBLIC_INTERFACE
/**
 * GET /classrooms/:code
 * Verify a classroom exists for a given code.
 * Returns: { classroom } or 404 if not found
 */
app.get('/classrooms/:code', (req, res) => {
  const { code } = req.params;
  if (
    typeof code !== 'string' ||
    code.length !== 6 ||
    !/^[A-Z0-9]{6}$/.test(code)
  ) {
    return res.status(400).json({ error: 'Invalid classroom code.' });
  }
  const classroom = classrooms[code];
  if (!classroom) {
    return res.status(404).json({ error: 'Classroom not found.' });
  }
  res.json({ classroom });
});

// PUBLIC_INTERFACE
/**
 * GET /
 * Health check endpoint
 */
app.get('/', (req, res) => {
  res.json({ status: 'ok', msg: 'Classroom Connect backend running.' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Classroom Connect backend listening on port ${PORT}`);
});

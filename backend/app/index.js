const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const authRoutes = require('./routes/authROutes');
const projectRoutes = require('./routes/projectRoutes');
const tasksRoutes = require('./routes/taskRoute');
const commentRoutes = require('./routes/commentRoute');

// Setup CORS before routes
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
const allowedOrigins = [process.env.FRONTEND_URL];


if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:5173'); // for local dev
}

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Now register your routes after CORS setup
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;

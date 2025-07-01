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
const allowedOrigins = process.env.FRONTEND_URL.split(',');


if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:5173'); // for local dev
}

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('❌ CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <h2>✅ Welcome to Praella Task Management Backend</h2>
    <p>🌐 Frontend URLs:</p>
    <ul>
      <li><a href="https://praella-task-management-system.vercel.app" target="_blank">Vercel Frontend</a></li>
      <li><a href="https://praella-task-managment-ui.score-book.com" target="_blank">Custom Domain Frontend</a></li>
    </ul>
  `);
});

// Now register your routes after CORS setup
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;

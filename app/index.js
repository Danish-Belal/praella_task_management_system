const express= require('express');
const app = express();


const authRoutes = require('./routes/authROutes');
const projectRoutes = require('./routes/projectRoutes');
const tasksRoutes = require('./routes/taskRoute');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', tasksRoutes);

module.exports = app;
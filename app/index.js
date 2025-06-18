const express= require('express');
const app = express();


const authRoutes = require('./routes/authROutes');
const projectRoutes = require('./routes/projectRoutes');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes)

module.exports = app;
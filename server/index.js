// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const reportRoutes = require('./routes/reports');
const userRoutes = require('./routes/users');
dotenv.config();

const app = express();

// Middleware
// app.use(cors());
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's URL
  credentials: true, // If you're sending cookies or authentication headers
}));
// Routes
app.get('/', (req, res) => {
    res.send('MERN Task Manager API');
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/users', userRoutes);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected');
  // Start the server after successful DB connection
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error(err));

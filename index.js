const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { Connection } = require('./config/db');
const { todoRouter } = require('./routes/todo.route');
const { userRouter } = require('./routes/user.route');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Set up rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Apply rate limiter to all routes
app.use(limiter);

const trustedOrigins = ['http://localhost:8000'];

// Custom CORS middleware to allow only trusted origins
const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;

  // Check if the origin is in the trustedOrigins array
  if (trustedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
};

app.use(corsMiddleware);
app.use(express.json());

app.use('/user', userRouter);
app.use('/todo', todoRouter);

app.listen(PORT, async () => {
  try {
    await Connection;
    console.log('Connected to DB');
  } catch (error) {
    console.log('Failed to connect to DB');
  }
  console.log(`Server running @ ${PORT}`);
});

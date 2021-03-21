const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const userRouter = require('./routes/userRoutes');
app.use(express.json());
app.use(cookieParser());

// Mounting
app.use('/api/v1/users', userRouter);

app.use((err, req, res, next) => {
  console.log('💥 FROM GLOBAL ERROR HANDLER 💥');

  res.status(err.statusCode || 500).json({
    status: err.status || 'err',
    message: err.message,
    error: err,
  });
});

module.exports = app;

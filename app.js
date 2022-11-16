if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const router = require('./routers/index');

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to myGram RESTFULL API',
  });
});
app.use(router);
module.exports = app;

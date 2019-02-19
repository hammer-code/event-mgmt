const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const router = require('./router');
const { HttpError } = require('./lib/errors');

const app = express();

// Apply global middlewares
app.use(cors({
  origin: '*',
}));
app.use(bodyParser.json());

app.use('/api', router);

// Error handler
app.use((error, request, response, next) => {
  console.error(error.stack)
  const isHttpError = error instanceof HttpError

  if (!isHttpError) {
    return response
      .status(500)
      .json({
        message: 'Something broke!'
      })
  }

  response
    .status(error.statusCode)
    .json(error.payload)
})

module.exports = app;

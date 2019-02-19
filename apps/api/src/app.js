const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const router = require('./router');

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
  error.status(500).send('Something broke!')
})

module.exports = app;

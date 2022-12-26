const express = require('express');
const cors = require('cors');

const app = express();
const index = require('./routes/index');
const appRoute = require('./routes/app.routes');
app.use(cors());
app.use(express.json());
//app.use(express.json({ type: 'application/json' }));
app.use(index);
app.use('/api/', appRoute);

module.exports = app;

const express = require('express');

const router = express.Router();

router.get('/ping', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'GNOME Todo an API Node.js + PostgreSQL',
    version: '1.0.0'
  });
});

module.exports = router;

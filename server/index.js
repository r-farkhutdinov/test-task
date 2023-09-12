/* eslint-disable @typescript-eslint/no-var-requires */
const data = require('./data.json');

const express = require('express');
const app = express();
const port = 3001;

app.get('/toc', (req, res) => {
    setTimeout(() => res.send(data), 1000);
});

app.listen(port, () => {
  console.log(`TOC app listening on port ${port}`);
});
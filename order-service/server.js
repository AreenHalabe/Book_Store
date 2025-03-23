const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
    console.log(`Order service is running on port ${PORT}..`);
});

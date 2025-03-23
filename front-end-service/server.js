const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3002;



app.listen(PORT, () => {
    console.log(`Frontend server is running on port ${PORT}..`);
});
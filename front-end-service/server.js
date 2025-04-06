const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3002;



app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));


const CATALOG_URL = 'http://catalog:3000';
const ORDER_URL = 'http://order:3001';



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});



app.get('/search/:topic', async (req, res) => {
  try {
    const { data } = await axios.get(`${CATALOG_URL}/search/${req.params.topic}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.get('/info/:id', async (req, res) => {
  try {
    const response = await axios.get(`${CATALOG_URL}/info/${req.params.id}`);
    res.json(response.data);
    
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.post('/purchase/:id', async (req, res) => {
    try 
    {
        const response = await axios.post(
            `${ORDER_URL}/purchase/${req.params.id}`,
            req.body,
            { headers: { 'Content-Type': 'application/json' } }
        );
        res.json(response.data);
    } catch (err) {
        console.error('Frontend proxy error:', err.message);
        res.status(500).json({ error: err.toString() });
    }
});





app.listen(PORT, () => {
    console.log(`Frontend server is running on port ${PORT}..`);
});
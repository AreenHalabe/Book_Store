const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const db = require('./database');


const app = express();
app.use(bodyParser.json());
const CATALOG_URL ='http://catalog:3000';
const PORT = process.env.PORT || 3001;

app.post('/purchase/:id', async (req, res) => {
  const bookId = req.params.id;
  const {quantity} = req.body;

  if (!bookId || quantity <= 0) {
    return res.status(400).json({ error: "Invalid bookId or quantity" });
}

  try {
    const response = await axios.get(`${CATALOG_URL}/info/${bookId}`);

    const book = response.data;

    if (book.stock < quantity) return res.status(400).json({ error: 'Out of stock' });
      // Update catalog with new stock using PUT
      const updatedBook = {
        title: book.title,
        stock: book.stock - quantity,
        cost: book.cost,
        topic: book.topic
      };

      const totalCost = book.cost * quantity;

      await axios.put(`${CATALOG_URL}/update/${bookId}`, updatedBook);

      db.run(
        "INSERT INTO orders (bookId, copies, cost) VALUES (?, ?, ?)",
        [bookId, quantity, totalCost],
        (err) => {
          if (err) {
            console.error('Order insert error:', err.message);
            return res.status(500).json({ error: err.message });
          }
          res.json({ message: `Purchased ${quantity} copy/copies of this book title -> : ${book.title}` });
        }
      );

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});



app.listen(PORT, () => {
  console.log(`Order service is running on port ${PORT}..`);
});

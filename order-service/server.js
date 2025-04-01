const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const { readItemWithID, updateItem } = require("../catalog-service/server.js");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

app.get("/PurchaseBook/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`http://localhost:3000/info/${id}`);

    if (!response.data || Object.keys(response.data).length === 0) {
      return res.status(404).send("Book Not Found");
    }

   //! check if the book is found (Correct ID)
   if (response.data.length > 0) {
    readItemWithID(id, (err, raw) => {
      if (err) {
        res.status(500).send("Error While Reading");
      } else {
        let stock = raw[0].Stocks; //! The number of Stocks
        //! i can buy the book
        if (stock > 0) {
          res.send("Successful Purchase");
        //  res.send( updateItem(id, --stock));
          updateItem(id, --stock);
        } else {
          //! The Stocks of Book is 0x
          res.send("Out of Stock");
        }
      }
    });
  } else {
    //! The ID is wrong !
    res.status(201).send("Book Not Found");
  }
} catch (error) {
  res.status(500).send("Error While Purchase");
}
});


app.listen(PORT, () => {
  console.log(`Order service is running on port ${PORT}..`);
});

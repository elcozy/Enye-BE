const express = require("express");
const app = express();
const axios = require("axios");
const port = 3000;

app.get("/api/rates", async (req, res) => {
  let { base, currency } = req.query;
  if (!base || !currency) return res.status(400).send("Invalid parameter!");
  try {
    const response = await axios.get(
      `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`
    );
    const { rates, base: unit, date } = response.data;
    res.send({ results: { base: unit, date, rates } });
  } catch (error) {
    res.status(500).send(error.response.data);
  }
});

app.get("*", (req, res) => {
  res.send('Welcome to Enye BE solution. Visit route "/api/rates"');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

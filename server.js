const express = require('express');
const axios = require('axios');
const app = express();

const port = process.env.PORT || 3000;

// Enable CORS (Cross-Origin Resource Sharing) for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Define a route to fetch quotes from the external API
app.get('/getQuote', async (req, res) => {
  try {
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const response = await axios.get(apiUrl);
    const quote = response.data.quoteText || 'Unknown Quote';
    const author = response.data.quoteAuthor || 'Unknown Author';
    res.json({ quote, author });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the quote.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

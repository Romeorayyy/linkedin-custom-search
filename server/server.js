const express = require('express');
const google = require('googlethis');
const cors = require('cors'); // Require CORS
const app = express();
const port = 4000;

app.use(cors()); // Use CORS middleware. This will allow all origins by default.

app.use(express.json());

app.get('/api/search', async (req, res) => {
  const { query } = req.query;
  const options = {
    page: 0,
    safe: false,
    parse_ads: false,
    additional_params: {
      hl: 'en',
    },
  };

  try {
    const response = await google.search(query, options);
    res.send(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

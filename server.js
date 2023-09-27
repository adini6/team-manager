const express = require('express');
const connection = require('./connection'); // Import your connection
const app = express();
const port = 3000;

app.use(express.json()); // Parse JSON bodies

// Example of a simple route
app.get('/', (req, res) => {
    res.send('g!');
});


app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});

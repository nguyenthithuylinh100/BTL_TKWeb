// server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from current directory
app.use(express.static(path.join(__dirname)));

// Handle placeholder image requests
app.get('/api/placeholder/:width/:height', (req, res) => {
    const { width, height } = req.params;
    res.redirect(`https://via.placeholder.com/${width}x${height}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
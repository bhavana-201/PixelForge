
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors({
  origin: 'https://pixel-forge-everd7ph5-bhavana-201s-projects.vercel.app' // your actual Vercel deployment URL
}));


// The catch-all route for the Single Page Application.
// This route should not be changed.
app.get('/back', async (req, res) => {
  res.json({
    message: 'This is the backend response from the server.',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
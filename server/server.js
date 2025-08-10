
const express = require('express');
const app = express();
const path = require('path');

// Serve the static files from the 'dist' folder.
// Ensure there is a dot between express and static.
app.use(express.static(path.join(__dirname, '../client/dist')));

// The catch-all route for the Single Page Application.
// This route should not be changed.
app.get('/*all', async (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
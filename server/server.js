const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
   origin: 'https://pixel-forge-everd7ph5-bhavana-201s-projects.vercel.app' 
}));

app.get('/', async (req, res) => {
 res.json({
   message: 'Welcome to the backend server!'
 });
});

app.get('/back', async (req, res) => {
   res.json({
  message: 'This is the backend response from the server.'
 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
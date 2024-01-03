const express = require('express');
const app = express();
const PORT = 4000;
const express = require('express');

const loanRoutes = require('./routes/loanRouter'); // Adjust the path accordingly
app.use('/loans', loanRoutes);

const userRoutes = require('./routes/userRouter'); // Adjust the path accordingly
app.use('/users', userRoutes);

// Import the MongoDB connection
require('./db');

// Example GET endpoint
app.get('/', (req, res) => {
  res.send('Welcome to my Node.js backend!');
});

// Example POST endpoint
app.post('/api/data', (req, res) => {
  // Handle POST request
  res.json({ message: 'Received POST request!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

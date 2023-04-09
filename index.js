require ('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { config } = require('dotenv');
 
const app = express();
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())



// Define schema
const userSchema = new mongoose.Schema({
  username: String,
});

// Define model
const User = mongoose.model('User', userSchema);

// Connect to MongoDB Atlas
mongoose.connect('mongodb://127.0.0.1:27017/Person', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Add username to collection
app.post('/add-username', async (req, res) => {
  const { username } = req.body;
  const user = new User({ username });
  await user.save();
  res.send('Username added successfully');
});

// Get all usernames from collection
app.get('/get-usernames', async (req, res) => {
  const users = await User.find();
  const usernames = users.map((user) => user.username);
  res.json(usernames);
});

// Start server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
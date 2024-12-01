const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Create Express app
const app = express();

// Middleware to parse JSON request body
app.use(express.json());
app.use(cors()); // Allow all origins
 const jstsecret="vema";
// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/mydemoooooo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a simple user schema for MongoDB
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// POST endpoint to create a new user
app.post('/user', async (req, res) => {
  const { email, name, password } = req.body;
  console.log('User data:', email, name, password); // Debugging line

  try {
    if (!email || !name || !password) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    const saltRounds = 10;
    const hashpass = bcrypt.hashSync(password, saltRounds);

    const newUser = new User({ email, name, password: hashpass });
    await newUser.save();

    res.status(201).send({
      status: true,
      message: 'User created successfully',
      newUser,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ status: false, message: 'Server error' });
  }
});

// POST endpoint to login a user and generate a JWT token
app.post('/user/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const findmail = await User.findOne({ email });

    if (!findmail) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Check if the password matches the stored hash
    const isPasswordValid = await bcrypt.compare(password, findmail.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: findmail._id, email: findmail.email },
      jstsecret, // Use an environment variable in production
      { expiresIn: '1h' } // Token expiration time
    );

    // Send the token as part of the response
    res.status(200).send({
      message: 'Login successful',
      token,
      user: findmail,
    });
  } catch (error) {
    console.error('Error in /user/login:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

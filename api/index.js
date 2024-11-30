const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');

// Middleware to parse JSON request body
app.use(express.json());
app.use(cors()); // Allow all origins

// Define a simple user schema for MongoDB
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true // Ensures the email is required
    },
    name: {
        type: String,
        required: true // Ensures the name is required
    },
    password: {
        type: String,
        required: true // Ensures the password is required
    }
  
},{timestamps: true});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/mydemoooooo');

// POST endpoint to create a new user
app.post('/user', async (req, res) => {
    const { email, name, password } = req.body;
    console.log('User data:', email, name, password); // Print data for debugging
   
          
    try {
        // Create and save the new user to the database
        if(!email || !name || !password)
            {
             return res.status(400).send({
                 message:"creadentials req"
             })
            }
        const saltRounds = 10;
        const hashpass= bcrypt.hashSync(password, saltRounds);
        const newUser = await User.create({ email, name, password:hashpass });

        // Send success response
        res.status(201).send({
            status: true,
            message: 'User created successfully',
            newUser
        });
    } catch (error) {
        // Handle errors during user creation
        console.error('Error creating user:', error);
        res.status(500).send({
            status: false,
            message: 'Server error'
        });
    }
});
app.post('/user/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const findmail = await User.findOne({ email });
  
      if (!findmail) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      // Password check logic (if applicable, e.g., bcrypt.compare)
      // Assuming passwords are hashed:
      const isPasswordValid = await bcrypt.compare(password, findmail.password);
      if (!isPasswordValid) {
        return res.status(401).send({ message: 'Invalid credentials' });
      }
  
      // If user is found and password matches, respond successfully
      res.status(200).send({ message: 'Login successful', user: findmail });
    } catch (error) {
      console.error('Error in /user/login:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });
  
// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

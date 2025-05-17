const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const signupSchema = require("../zod/signupclear");
const User = require("../models/user");

const signupUser = async (req, res) => {
  try {
    // Validate request body against signup schema
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      console.error('Validation errors:', parsed.error.format());
      return res.status(400).json({ errors: parsed.error.format() });
    }

    const { username, password, role } = parsed.data;

    // Check if username already exists
    const existingUser = await User.findOne( {username} );
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }



    // Create new user instance
    const newUser = new User({
      username,
      password,
      role
    });

    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Respond with token and user info
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role,
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = signupUser;

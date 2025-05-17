const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const loginSchema = require("../zod/userClearance");
const User = require("../models/user");
const AadhaarLog = require("../models/adhar");

const loginUser = async (req, res) => {
    try{
        const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    console.error('Validation errors:', parsed.error.format());
    return res.status(400).json({ errors: parsed.error.format() });
  }

  const { username, password } = parsed.data;
  try {
    const user = await User.findOne({ username });
    const ismatch = await  bcrypt.compare(password, user.password);

    if (!user) {
        console.error("ERROR", user)
      return res.status(401).json({ message: 'user not found' });
    }
    if (!ismatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = loginUser;
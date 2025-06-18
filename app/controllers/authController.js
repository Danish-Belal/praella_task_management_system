const {createUser, findUserByEmail} = require('../models/userModel');
const {hashPassword, comparePasswords} = require('../utils/hash');


const signupUser = async (req, res) => {
  try {
    const { name,email, password } = req.body;
    
    
    const existing = await findUserByEmail(email);
    
    
    if (existing) return res.status(400).json({ msg: 'Email already registered, PLease tru different email' });

    const hashed = await hashPassword(password);
    const user = await createUser(name,email, hashed);
    res.status(201).json({ msg: 'Signup success', user });
  } catch (err) {
    res.status(500).json({ msg: 'Error during signup', error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ msg: 'User not found' });

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    res.status(200).json({ msg: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ msg: 'Error during login', error: err.message });
  }
};

module.exports = { signupUser, loginUser };
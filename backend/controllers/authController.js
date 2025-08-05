import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
    console.log('Body:', req.body);

    try {
        const { username, email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        console.log('User created successfully');
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration error', error: error.message });
    }
}
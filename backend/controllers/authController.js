import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message: 'Email already registred'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User ({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({message: 'User registred successfully'});

    } catch (error) {
        res.status(500).json({message: 'Registration error', error});
    }
}
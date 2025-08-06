import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
    
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({message: 'Invalid credentials'});
            }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({message: 'Invalid credentials'});
            }

        const token = jwt.sign(
            { userId: user._id, email: user.email},
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        
        

        res.status(200).json({
            token,
            message: 'Login successful',
            user: {
                username: user.username
            }
        })

    } catch (error) {
        res.status(500).json({message: 'Login error', error})
    }
}

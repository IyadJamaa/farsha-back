const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const loginController = async (req, res) => {
    try {
        const { userId, password } = req.body;
        
        // Find user by userId
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password",
            });
        }

        // Passwords match, send user data
        res.status(200).json({
            user,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const registerController = async (req, res) => {
    try {
        const { name, userId, password, role } = req.body;

        // Check if userId already exists
        const existingUser = await User.findOne({ userId });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // If the role is admin, check the current number of admins
        if (role === 'admin') {
            const adminCount = await User.countDocuments({ role: 'admin' });
            if (adminCount >= 3) {
                return res.status(400).json({
                    success: false,
                    message: "Admin limit reached. Only 3 admins allowed.",
                });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with hashed password
        const newUser = new User({
            name,
            userId,
            password: hashedPassword,
            role,
            // Add other user data here if needed
        });

        // Save the user to the database
        await newUser.save();

        // Send success response
        res.status(201).json({
            success: true,
            message: "User registered successfully",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = { loginController, registerController };

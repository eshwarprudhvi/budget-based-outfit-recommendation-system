import mongoose from "mongoose";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const generateToken = (userId) => {
  try {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, confirm } = req.body;

    if (!name || !email || !password || !confirm) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    if (password !== confirm) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    //check for existing user
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name,
      email,
      password: hashedPassword,
    });
    const token = generateToken(user._id);

    res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id); // ← only after password verified

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// ── GET ME (protected) ──
const getMe = async (req, res) => {
  try {
    // req.user is set by the protect middleware
    res.status(200).json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const googleAuth = async (req, res) => {
  try {
    const { name, email, googleId } = req.body;

    if (!name || !email || !googleId) {
      return res.status(400).json({ message: "Invalid Google data" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        // password: googleId, // use googleId as password 
        googleId,
      });
    }
    const token = generateToken(user._id);
    res.status(200).json({
      message: "Google login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { login, register, getMe,googleAuth };



import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js'; 

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Looking for email:", email.trim().toLowerCase()); 

        const admin = await Admin.findOne({ email: email.trim().toLowerCase() });
        
        if (!admin) {
            console.log("No admin found in DB!");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log("Admin found in DB:", admin);

        if (password.trim() !== admin.password.trim()) {
            console.log("Password mismatch! DB:", admin.password, "Input:", password);
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'secretKey', { expiresIn: '1h' });
        res.json({ token, adminId: admin._id });
        
    } catch (err) {
        console.error("Login Server Error:", err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/verify-passcode', (req, res) => {
  try {
    const { passcode } = req.body;
    
    // እቲ ንስኻ ኣብ Render Environment Variable እተቀምጦ ፓስኮድ
    const serverPasscode = process.env.PRICE_PASSCODE; 

    if (passcode === (serverPasscode || "1234")) {
      return res.status(200).json({ success: true, message: "Authorized" });
    } else {
      return res.status(401).json({ success: false, message: "Invalid passcode" });
    }
  } catch (err) {
    console.error("Passcode Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
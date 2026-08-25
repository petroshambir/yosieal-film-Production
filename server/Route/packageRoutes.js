import express from 'express';
import Package from '../models/sitePrices.js';

const router = express.Router();

// GET /api/packages - ኩሉ ዋጋታት ካብ ዳታቤዝ ንምውራድ
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find();
    const formattedData = {};
    packages.forEach(p => {
      formattedData[p.name.toLowerCase()] = p;
    });
    res.json(formattedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/packages/update - ሓድሽ ዋጋታት ኣብ ዳታቤዝ ንምዕቃብ
router.post('/update', async (req, res) => {
  const updatedData = req.body;

  try {
    for (const key in updatedData) {
      await Package.findOneAndUpdate(
        { name: key.charAt(0).toUpperCase() + key.slice(1) }, 
        updatedData[key], 
        { upsert: true, new: true }
      );
    }
    res.json({ success: true, message: 'ዳታ ብሰላም ተዐቂቡ!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
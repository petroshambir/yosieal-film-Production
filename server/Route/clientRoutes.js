
import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import ClientProject from '../models/ClientProject.js';

const router = express.Router();

// Cloudinary Config (环境变量 ካብ .env ዝወስዶ)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cloudinary Storage Setup (500 ስእሊ ብደሓን ንምጽዓን)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'habesha_client_portals', // ኣብ ክላውድነሪ ዝለኣខሉ ፎልደር
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }] // ሳይዝ ንምቕናስ
  },
});

const upload = multer({ storage: storage });

// 0. [ADMIN & CLIENT] ኩሎም ፖርታልስ ንምጽዋዕ
router.get('/portals', async (req, res) => {
    try {
        const portals = await ClientProject.find().sort({ createdAt: -1 });
        res.status(200).json(portals);
    } catch (err) {
        console.error("Error fetching portals:", err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// 1. [ADMIN] ሓድሽ ፖርታል ምፍጣር

// router.post('/create-portal', async (req, res) => {
//     try {
//         const { clientName, portalNumber, images } = req.body;
//         const passcode = Math.floor(1000 + Math.random() * 9000).toString();

//         const newProject = new ClientProject({
//             clientName,
//             passcode,
//             portalNumber,
//             images: images || [],
//             selectedImages: []
//         });

//         await newProject.save();
//         res.status(201).json({ success: true, passcode, newProject });
//     } catch (err) {
//         console.error("Error creating portal:", err);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// });
// [ADMIN] ሓድሽ ፖርታል ምፍጣር
router.post('/create-portal', async (req, res) => {
    try {
        const { clientName, portalNumber, images } = req.body; // images ሕጂ URLs እዮም
        const passcode = Math.floor(1000 + Math.random() * 9000).toString();

        const newProject = new ClientProject({
            clientName,
            portalNumber,
            passcode,
            images: images || [], // እዚ ምስ ዝመጽእ URLs እዩ
            selectedImages: []
        });

        await newProject.save();
        res.status(201).json({ success: true, passcode, newProject });
    } catch (err) {
        console.error("Error creating portal:", err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// 🟢 1.1 [ADMIN] ስእሊታት ናብ CLOUDINARY ንምጽዓን (500 ስእሊ ብደሓን ዝተቐማጠሉ)
router.post('/upload-image', upload.array('images', 500), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'ዝኾነ ስእሊ ኣይተረኽበን' });
        }

        // ካብ ክላውድነሪ ዝተመልሰ ደሓን ዝኾነ Secure URL ንFrontend ንህቦ
        const uploadedImages = req.files.map(file => ({
            original: file.path,       // Cloudinary Secure URL
            compressed: file.path     // Cloudinary Secure URL (ብኮንፊግ ተጠቂሙ ዝተቐነሰ)
        }));

        res.status(200).json({ success: true, images: uploadedImages });
    } catch (err) {
        console.error("Error uploading to Cloudinary:", err);
        res.status(500).json({ success: false, message: 'ስእሊ ናብ ክላውድ ምጽዓን ኣይከኣለን።' });
    }
});

// 2. [CLIENT] ብፓስኮድ ኣቲኻ ፖርታል ምርካብ
router.post('/verify-client-passcode', async (req, res) => {
    try {
        const { passcode } = req.body;
        if (!passcode) {
            return res.status(400).json({ success: false, message: "Passcode is required" });
        }

        const project = await ClientProject.findOne({ passcode: passcode.trim() });
        if (!project) {
            return res.status(401).json({ success: false, message: "ይቕሬታ፣ ዝኣተውዎ ፓስኮድ ቅኑዕ አይደለም" });
        }

        res.status(200).json({ success: true, project });
    } catch (err) {
        console.error("Error verifying passcode:", err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// 3. [CLIENT] ካስተመር ዝመረጾም ስእሊታት ምልኣክ
router.post('/submit-selection/:id', async (req, res) => {
    try {
        const { selectedImages } = req.body;
        const project = await ClientProject.findByIdAndUpdate(
            req.params.id,
            { selectedImages, isCompleted: true },
            { new: true }
        );

        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        res.status(200).json({ success: true, message: "Selection submitted successfully", project });
    } catch (err) {
        console.error("Error submitting selection:", err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// 4. [ADMIN] ፎልደር ምድምساس

router.delete('/delete-portal/:id', async (req, res) => {
    try {
        const project = await ClientProject.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        
        res.status(200).json({ success: true, message: "Portal and images deleted successfully" });
    } catch (err) {
        console.error("Error deleting portal:", err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
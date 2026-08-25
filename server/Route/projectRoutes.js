import express from 'express';
// import Project from '../models/project.js'; // ኣብ ኣይነት ናይ ፕሮጀክት ሞዴል ኣሎ።
import Project from "../models/Project.js";
//
import { upload } from '../cloudinaryConfig.js'
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching projects' });
    }
});

// ሓድሽ ፕሮጀክት ንምውሳኽ (Admin)
router.post('/add', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.json(newProject);
    } catch (err) {
        res.status(400).json({ message: 'Error saving project' });
    }
});


// 1. ስእሊ ንምጽዓን (Upload) - ብ Title ይሰርሕ
router.post('/:title/upload', (req, res) => {
    upload.array('images', 5)(req, res, async (err) => {
        if (err) {
            console.error("Multer Error:", err);
            return res.status(500).json({ message: "File upload failed", error: err.message });
        }

        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            // ብ Title ንደልዮ (ንኣብነት Weddings, Bridal Shoots)
            let project = await Project.findOne({ title: req.params.title });

            // እቲ ፕሮጀክት ገና ኣብ DB ከይነበረ እንተተረኺቡ፡ ብኣውቶማቲክ ንፈጥሮ
            if (!project) {
                project = new Project({ title: req.params.title, names: "", images: [] });
            }

            const imageUrls = req.files.map(file => file.path);
            project.images.push(...imageUrls);
            await project.save();
            
            res.json({ message: "Uploaded Successfully", images: project.images });
        } catch (error) {
            console.error("Database Error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
});

// 2. ሽምን ካልእ ዳታን ንምቕያር (PUT) - ብ Title ይሰርሕ
router.put('/:title', async (req, res) => {
    try {
        let updatedProject = await Project.findOneAndUpdate(
            { title: req.params.title }, 
            { $set: req.body }, 
            { new: true, upsert: true } // ዛጊት ካብ ዘይነበረ ባዕሉ ይፈጥሮ
        );
        res.json(updatedProject);
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ message: "Error updating" });
    }
});


// ስእሊ ንምድምساس ብ Title
router.delete('/:title/images', async (req, res) => {
    try {
        const { imgUrl } = req.body;
        let project = await Project.findOne({ title: req.params.title });
        if (!project) return res.status(404).json({ message: "Project not found" });

        project.images = project.images.filter(img => img !== imgUrl);
        await project.save();
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: "Error deleting image" });
    }
});
export default router;

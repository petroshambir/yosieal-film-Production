
import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    names: { type: String },         // ለውጢ: ንስም ናይ ሰብ
    date: { type: String },          // ለውጢ: ንዕለት
    description: { type: String },   // ትሕዝቶ
    category: { type: String },      // ካታጎሪ
    images: { type: [String], default: [] }, // ስእልታት ኣብ Array ይቕመጡ
    createdAt: { type: Date, default: Date.now }
});

// "project" ዘይኮነስ "Project" ክትጥቀም ይምረጽ
const Project = mongoose.model('Project', ProjectSchema);

export default Project;

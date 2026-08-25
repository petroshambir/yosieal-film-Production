
import mongoose from 'mongoose';

const clientProjectSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    portalNumber: { type: String, required: true },
    passcode: { type: String, required: true },
    images: [{
        original: { type: String, required: true },
        compressed: { type: String, required: true }
    }],
    selectedImages: [{
        original: { type: String, required: true },
        compressed: { type: String, required: true }
    }],
    isCompleted: { type: Boolean, default: false }
}, { timestamps: true });

const ClientProject = mongoose.model('ClientProject', clientProjectSchema);
export default ClientProject;
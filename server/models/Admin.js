
import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// ኣብዚ 'admin' ዝብል ኮሌክሽን ስም ወሲኽና ኣለና
export default mongoose.model('Admin', AdminSchema, 'admin');